Role('JooseX.Namespace.Depended.Manager', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProperties' ],
    
    
    have : {
        containResources                : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ],
        
        ANONYMOUS_RESOURCE_COUNTER      : 0
    },

	have : {
		INC                          : [ 'lib', '/jsan' ],
		
		disableCaching               : true,
        
        resources                    : {},
        
        resourceTypes                : {},
        
        ANONYMOUS_RESOURCE_COUNTER   : 0
	},

    
    override: {
        
        prepareProperties : function (name, extend) {
            
            if (typeof name != 'string') {
                extend = name
                name = null
            }
            
            extend = extend || {}
            
            var summaredDeps = []
            
            var extendMy = extend.my
            
            //gathering all the related resourses from various builders
            //also gathering resourses of 'my'
            Joose.A.each(this.containResources, function (propName) {
                
                this.collectDependencies(extend[propName], summaredDeps)
                    
                if (extendMy && extendMy[propName]) this.collectDependencies(extendMy[propName], summaredDeps)
            }, this)
            
            
            //and from externally collected additional resources 
            summaredDeps = summaredDeps.concat(this.alsoDependsFrom(extend))
            
            if (!summaredDeps.length) return this.SUPERARG(arguments)
            
            
            var resource = JooseX.Namespace.Depended.Manager.my.getResource({
                type : 'joose',
                token : name || this.ANONYMOUS_RESOURCE_COUNTER++
            })
            
            
            if (extend.VERSION) {
                resource.setVersion(extend.VERSION)
                
                delete extend.VERSION
            }
            
            //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
            //this allows to manually control the "ready-ness" of module (custom pre-processing)
            //BEGIN receives the function (callback), which should be called at the end of custom processing 
            if (extend.BEGIN) {
                resource.setOnBeforeReady(extend.BEGIN)
                
                delete extend.BEGIN
            }
            
            Joose.A.each(summaredDeps, function (descriptor) {
                resource.addDescriptor(descriptor)
            })
            
            var me = this
        
            //unshift is critical for correct order of readyListerens processing!
            //constructing is delaying until resource will become ready 
            resource.readyListeners.unshift(function () {
                me.construct(name, extend, resource)
            })
            
            resource.handleDependencies()
            
            return {
                name : name,
                meta : Joose.Namespace.Keeper,
                props : {}
            }
        }
        
    },
    //eof override
    
    methods : {
        
        alsoDependsFrom : function (extend) {
            return []
        },
        
        
        collectDependencies : function (from, to) {
            Joose.A.each(Joose.O.wantArray(from), function (descriptor) {
                if (descriptor && typeof descriptor != 'function') to.push(descriptor)
            })
        },
        
        
        construct : function (name, extend, resource) {
            this.inlineDependencies(extend)
            
            var extendMy = extend.my
            
            if (extendMy) this.inlineDependencies(extendMy)
            
            var meta = extend.meta || Joose.Meta.Class
            
            delete extend.meta
            
            Joose.Namespace.Manager.my.create(name, meta, extend)
        },
        
        
        inlineDependencies : function (extend) {
            delete extend.use
            
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
                    
                    if (propName != 'isa' && propName != 'meta')
                        extend[propName] = descriptors
                    else
                        if (descriptors.length > 1) 
                            throw "Cant specify several super- or meta- classes"
                        else
                            extend[propName] = descriptors[0]
                        
                }
            })
            
            this.alsoInline(extend)
        },
        
        
        alsoInline : function (extend) {
        },
	
        
        //get own resource of some thing (resource will be also attached to that abstract thing)
        getMyResource : function (type, token, me) {
            if (!token) token = '__ANONYMOUS_RESOURCE__' + this.ANONYMOUS_RESOURCE_COUNTER++
            
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
                
            } else 
                if (typeof descriptor == 'string') {
                
                    var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                    
                    if (!match) {
                        type = 'joose'
                        token = descriptor
                    } else {
                        type = match[1]
                        token = match[2]
                    }
                }
            
            var id = type + '://' + token
            
            var resource = this.resources[id]
            
            if (!resource) {
                var resourceClass = this.resourceTypes[type]
                if (!resourceClass) throw "Unknown resource type: [" + type + "]"
                
                resource = this.resources[id] = new resourceClass(typeof descriptor == 'object' ? descriptor : { 
                    token : token,
                    
                    type : type
                })
            }
            
            resource.setRequiredVersion(requiredVersion)
            
            return resource
        },
        
        
        registerResourceClass : function (typeName, resourceClass) {
            this.resourceTypes[typeName] = resourceClass
        },
        
        
        use : function (dependenciesInfo, callback, scope) {
//                var nsManager = Joose.Namespace.Manager.my
//                var global = nsManager.global
//                
//                new Joose.Namespace.Keeper(null, {
//	                use    : dependenciesInfo,
//	                body   : function () {
//                        
//	                    if (callback) nsManager.executeIn(global, callback)
//	                }
//	            })
        }
        
    }
})

use = function (dependenciesInfo, callback, scope) {
    JooseX.Namespace.Depended.Manager.my.use(dependenciesInfo, callback, scope) 
}


Joose.FutureClass = function (className) { return function () { return eval(className) } }


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})