Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC : [ 'lib', '/inc' ],
			
			disableCaching : true,
            
            resources : {},
            
            resourceTypes : {},
            
            ANONYMOUS_CLASS_COUNTER : 0
    	},

    	
        methods : {
            
            getMyResource : function (type, token, me) {
                if (!token) token = '__ANONYMOUS_CLASS__' + this.ANONYMOUS_CLASS_COUNTER++
                
                var resource = this.getResource({
                    type : type,
                    token : token
                })
                
                if (resource.attachedTo && resource.attachedTo != me) throw resource + " is already attached to [" + resource.attachedTo + "]"
                
                resource.attachedTo = me
                resource.loaded = true
                resource.loading = false
                
                return resource
            },
            
            
            getResource : function (descriptor) {
                var type, token, requiredVersion
                
                if (typeof descriptor == 'object') {
                    type                = descriptor.type
                    token               = descriptor.token
                    requiredVersion     = descriptor.version
                    
                    delete descriptor.version
                    
                } else if (typeof descriptor == 'string') {
                
                    var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                    
                    if (!match) {
                        type = 'js'
                        token = descriptor
                    } else {
                        type = match[1]
                        token = match[2]
                    }
                }
                    
                var id = type + '://' + token
                
                if (!this.resources[id]) {
                    var resourceClass = this.resourceTypes[type]
                    if (!resourceClass) throw "Unknown resource type: [" + type + "]"
                        
                    this.resources[id] = new resourceClass(typeof descriptor == 'object' ? descriptor : { 
                        id : id, 
                        token : token
                    })
                }
                
                this.resources[id].setRequiredVersion(requiredVersion)
                
                return this.resources[id]
            },
            
            
            registerResourceClass : function (typeName, resourceClass) {
                this.resourceTypes[typeName] = resourceClass
            },
            
            
	        use: function (dependenciesInfo, callback, scope) {
                new Joose.Namespace.Keeper(null, {
	                use: dependenciesInfo,
	                body: function () {
	                    if (callback) callback.call(scope || this)
	                }
	            })
	        }
            
        }
    }
    
})

use = function (dependenciesInfo, callback, scope) {
    JooseX.Namespace.Depended.Manager.my.use(dependenciesInfo, callback, scope) 
}

;
Class('JooseX.Namespace.Depended.Resource', {
    
    has : {
        
        attachedTo          : null,
        
        type                : null,
        token               : null,
        
        id                  : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        readyListeners      : Joose.Array,
        
        dependencies        : Joose.Object,
        
        onBeforeReady       : null,
        readyDelegated      : false,
        
        version             : { is : 'rw', init : null },
        requiredVersion     : { is : 'rw', init : null }
    },
    
    
    after: {
        
        initialize: function () {
            if (!this.id) this.id = this.type + '://' + this.token
        }
        
    },

    
    
    methods: {
        
        setVersion : function (version) {
            if (!version) return
            
            if (this.version) throw "Cant redefine version of " + this
            
            var requiredVersion = this.requiredVersion
            
            if (requiredVersion && version < requiredVersion) throw "Versions conflict on " + this + " required [" + requiredVersion + "], got [" + version + "]"
                
            this.version = version
        },
        
        
        setRequiredVersion : function (version) {
            if (!version) return
            
            var requiredVersion = this.requiredVersion
            
            if (!requiredVersion || version > requiredVersion) 
                if (this.isLoaded() || this.loading)
                    throw "Cant increase required version - " + this + " is already loaded"
                else
                    this.requiredVersion = version
        },
        
        
        toString : function () {
            return "Resource: id=[" + this.id + "] type=[" + this.meta.name + "]"
        },
        
        
        addDescriptor : function (descriptor) {
            var resource = JooseX.Namespace.Depended.Manager.my.getResource(descriptor)
            
            //if there is already such dependency or the resource is ready
            if (this.dependencies[resource.id] || resource.ready) return
            
            var me = this
            //pushing listener to the end(!) of the list
            resource.readyListeners.push(function () {
                
                delete me.dependencies[resource.id]
                me.checkReady()
            })
            
            //adding dependency
            this.dependencies[resource.id] = resource
            
            //we are not ready, since there are depedencies to load                
            this.ready = false
        },
        
        
        handleDependencies : function () {
            // || {} required for classes on which this Role was applied after they were created - they have this.dependencies not initialized
            Joose.O.eachSafe(this.dependencies || {}, function (resource) {
                resource.handleLoad()
            })
            
            this.checkReady()
        },
        
        
        checkReady : function() {
            if (!Joose.O.isEmpty(this.dependencies)) return
            
            if (this.onBeforeReady) {
                
                if (!this.readyDelegated) {
                    this.readyDelegated = true
                    
                    var me = this
                    
                    this.onBeforeReady(function(){
                        me.fireReady()
                    })
                }
            } else 
                this.fireReady()
        },
        
        
        fireReady: function () {
            this.ready = true
            this.readyDelegated = false
            
            var listeners = this.readyListeners || []
            this.readyListeners = []
            
            Joose.A.each(listeners, function (listener) {
                listener()
            })
        },
        
        
        isLoaded : function () {
            return this.loaded || this.ready
        },
        
        
        handleLoad: function() {
            
            if (this.isLoaded()) {
                this.checkReady()
                return
            }
            
            if (this.loading) return
            this.loading = true
            
            var urls = Joose.O.wantArray(this.getUrls())
            
            var me = this
            
            var onsuccess = function (resourceBlob) {
                me.loaded = true
                me.loading = false
                
                me.materialize(resourceBlob)
                
                me.checkReady()
            }
            
            var onerror = function (e) {
                //if no more urls
                if (!urls.length) throw me + " not found" 
                
                me.load(urls.shift(), onsuccess, onerror)
            }
            
            this.load(urls.shift(), onsuccess, onerror)
        },
        

        getUrls: function () {
            throw "Abstract resource method 'getUrls' was called"
        },
        
        
        load : function () {
            throw "Abstract resource method 'load' was called"
        },
        
        
        materialize : function (resourceBlob) {
            throw "Abstract resource method 'materialize' was called"
        }
        
    }
})
;
Role('JooseX.Namespace.Depended.Materialize.Code', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob) {
            eval(resourceBlob)
        }
        
    }

});
/**
 * Copyright (c) 2009 Christoph Dorn <christoph@christophdorn.com>
 */

Role('JooseX.Namespace.Depended.Transport.Require', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var text; 
            
            try {
                text = require(url);
            } catch (e) {
                onerror(e)
                return
            }
            
            onsuccess(text);
        }
        
    }
    
})
;

/**
 * This Securable Modules [1] loader is currently only tested against Narwhal [2].
 * 
 * [1] - https://wiki.mozilla.org/ServerJS/Modules/SecurableModules
 * [2] - http://narwhaljs.org/
 * 
 * Copyright (c) 2009 Christoph Dorn <christoph@christophdorn.com>
 * 
 * Usage:
 * 
 *   SetJoose include path stack:
 *     
 *     JooseX.Namespace.Depended.Manager.my.INC = [ '/lib/joose/lib/src' ]
 *     
 *   Define module that depends on another module:
 *   
 *     Module("OurModule", {
 *       use : 'require://OtherModule',
 *       body : function () {
 *         // TODO: Implement Classes
 *       }
 *     })
 */

Class('JooseX.Namespace.Depended.Resource.Require', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Transport.Require, JooseX.Namespace.Depended.Materialize.Code ],
    
    
    methods : {
        
        getUrls : function () {
            var urls = []
            var className = this.token.split('.')
            
            // Resolve the module/class against our Joose include path stack
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                
                libroot = libroot.replace(/\/$/, '');
                
                var path = [ libroot ].concat(className).join('/') + '.js';

                try {
                  
                  // Ensure path exists
                  path = require.loader.find(path);

                  urls.push( path );

                } catch(e) {}               
            });
            
            // Let the require.loader resolve the module/class against the ServerJS include path stack
            try {
                urls.push( require.loader.find(className) );
            } catch(e) {}               
            
            return urls
        }
        
    },
    
    
    override : {
        
        addDescriptor : function (descriptor) {
            if (typeof descriptor == 'object' && !descriptor.token) 
                Joose.O.eachSafe(descriptor, function (version, name) {
                    this.addDescriptor({
                        type : 'require',
                        token : name,
                        version : version
                    })
                }, this);
            else
                this.SUPER(descriptor);
        }

    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('require', JooseX.Namespace.Depended.Resource.Require)
;
Role('JooseX.Namespace.Depended', {
    
    requires : [ 'construct' ],
    
    have : {
        version             : null,
        
        resource            : null,
        
        containResources    : [ 'isa', 'does', 'metaRole', 'metaRoles', 'trait', 'traits' ]
    },

    
    override: {
        
        construct: function (extend) {
            var me = this
            extend = extend || {}
            
            //the case of pure namespace keeper creation (not Module) - such keeper should not have a resource
            if (this instanceof Joose.Namespace.Keeper && Joose.O.isEmpty(extend)) {
                this.SUPER(extend)
                return
            }
            
            if (!this.resource) this.resource = JooseX.Namespace.Depended.Manager.my.getMyResource('js', this.name, this.c)
            
            var resource = this.resource
            
            if (!resource.ready) {
                
                if (extend.version) {
                    this.version = extend.version
                    delete extend.version
                    
                    resource.setVersion(this.version)
                }
                
                //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
                //this allows to manually control the "ready-ness" of module (custom pre-processing)
                //BEGIN receives the function (callback), which should be called at the end of custom processing 
                if (extend.BEGIN) {
                    var BEGIN = extend.BEGIN
                    delete extend.BEGIN
                    
                    resource.onBeforeReady = function (ready) {
                        BEGIN.call(me.c, ready)
                    }
                }
                
                extend.use = Joose.O.wantArray(extend.use || [])
                
                Joose.A.each(this.containResources, function (propName) {
                    if (extend[propName])
                        Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor) {
                            
                            if (typeof descriptor != 'function') extend.use.push(descriptor)
                        })
                })
                
                    
                Joose.A.each(extend.use, function (descriptor) {
                    resource.addDescriptor(descriptor)
                })
                delete extend.use
            
                //unshift is critical for correct order of readyListerens processing!
                //constructing is delaying until module will become ready 
                resource.readyListeners.unshift(function () {
                    me.construct(extend)
                })
                
                resource.handleDependencies()
                
            } else {
                
                Joose.A.each(this.containResources, function (propName) {
                    
                    if (extend[propName]) {
                    
                        var descriptors = []
                        
                        Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor, index) {
                            
                            if (typeof descriptor == 'function')
                                descriptors.push(descriptor)
                            else
                                if (typeof descriptor == 'object')
                                    if (descriptor.token)
                                        descriptors.push(eval(descriptor.token)) 
                                    else
                                        Joose.O.each(descriptor, function (version, name) { 
                                            descriptors.push(eval(name)) 
                                        })
                                else 
                                    if (typeof descriptor == 'string')
                                        descriptors.push(eval(descriptor))
                                    else 
                                        throw "Wrong dependency descriptor format: " + descriptor
                            
                        })
                        
                        if (propName != 'isa')
                            extend[propName] = descriptors
                        else
                            if (descriptors.length > 1) 
                                throw "Cant specify several superclasses"
                            else
                                extend[propName] = descriptors[0]
                            
                    }
                })
                
                this.SUPER(extend)
            }
        }
        //eof construct
    }
    //eof override
})


Joose.Meta.Class.meta.extend({
    does                        : [ JooseX.Namespace.Depended ]
})

Joose.Meta.Role.meta.extend({
    does                        : [ JooseX.Namespace.Depended ]
})
;
