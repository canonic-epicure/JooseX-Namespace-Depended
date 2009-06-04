Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC : [ 'lib', '/inc' ],
			
			disableCaching : true,
            
            resources : {},
            
            resourceTypes : {}
    	},

    	
        methods : {
            
            getMyResource : function (descriptor, me) {
                var resource = this.getResource(descriptor)
                
                
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
    
    have : {
        
        attachedTo          : null,
        
        type                : null,
        token               : null,
        
        id                  : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        readyListeners      : null,
        
        dependencies        : null,
        
        onBeforeReady       : null,
        readyDelegated      : false
    },
    
    
    has : {
        version             : { is : 'rw', init : null },
        requiredVersion     : { is : 'rw', init : null }
    },
    
    
    after: {
        
        initialize: function () {
            this.dependencies = {}
            this.readyListeners = []
            
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
Role('JooseX.Namespace.Depended', {
    
    requires : [ 'construct' ],
    
    have : {
        version             : null,
        
        resource            : null,
        
        containResources    : [ 'isa', 'does', 'metaRoles' ]
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

            if (!this.resource) this.resource = JooseX.Namespace.Depended.Manager.my.getMyResource('js://' + this.name, this.c)
            
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
