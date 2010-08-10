Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProperties' ],
    
    
    have : {
        containResources                    : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ]
    },

    
    override: {
        
        prepareProperties : function (name, extend, defaultMeta, callback) {
            
            if (name && typeof name != 'string') {
                extend = name
                name = null
            }
            
            extend = extend || {}
            
            var summaredDeps = []
            
            var extendMy = extend.my
            
            //gathering all the related resourses from various builders
            //also gathering resourses of 'my'
            Joose.A.each(this.containResources, function (propName) {
                
                this.collectDependencies(extend[propName], summaredDeps, extend, propName)
                    
                if (extendMy && extendMy[propName]) this.collectDependencies(extendMy[propName], summaredDeps, extendMy, propName)
            }, this)
            

            //and from externally collected additional resources 
            this.alsoDependsFrom(extend, summaredDeps)
            
            
            var resource = JooseX.Namespace.Depended.Manager.my.getResource({
                type : 'joose',
                token : name
            })
            
            
            if (extend.VERSION) resource.setVersion(extend.VERSION)
            
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
            
            
            //skip constructing for classes w/o dependencies 
            if (Joose.O.isEmpty(resource.dependencies)) {
                this.inlineDependencies(extend)
                
                var res = this.SUPER(name, extend, defaultMeta, callback)
                
                //this will allow to classes which don't have dependencies to be ready synchronously
                resource.checkReady()
                
                return res
            } else {
                // defer the dependencies loading, because they actually could be provided later in the same bundle file
                // this, however, affect performance, so bundles should be created in the dependencies-ordered way
                setTimeout(function () {
                    resource.handleDependencies()
                }, 0)
                
                // debugging warning
                if (typeof ENABLE_DEFERRED_DEPS_WARNING != 'undefined')
                    console.log('Deferred deps handling for class [' + name + '], deps = [' + JSON.stringify(resource.dependencies) + ']')
            }
            

            
            var me = this
        
            //unshift is critical for correct order of readyListerens processing!
            //constructing is delaying until resource will become ready 
            resource.readyListeners.unshift(function () {
                me.inlineDependencies(extend)
                
                me.prepareProperties(name, extend, defaultMeta, callback)
            })
            
            return this.create(name, Joose.Namespace.Keeper, {})
        },
        
        
        create : function () {
            var meta = this.SUPERARG(arguments).meta
            
            meta.resource = meta.resource || JooseX.Namespace.Depended.Manager.my.getMyResource('joose', meta.name, meta.c)
            
            return meta.c
        }
    },
    //eof override
    
    
    methods : {
        
        alsoDependsFrom : function (extend, summaredDeps) {
        },
        
        
        collectDependencies : function (from, to, extend, propName) {
            Joose.A.each(Joose.O.wantArray(from), function (descriptor) {
                if (descriptor && typeof descriptor != 'function') to.push(descriptor)
            })
        },
        
        
        inlineDependencies : function (extend) {
            this.inlineDeps(extend)
            
            var extendMy = extend.my
            
            if (extendMy) this.inlineDeps(extendMy)
        },
        
        
        inlineDeps : function (extend) {
            delete extend.use
            
            Joose.A.each(this.containResources, function (propName) {
                
                if (extend[propName]) {
                
                    var descriptors = []
                    
                    Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor, index) {
                        
                        var descType = typeof descriptor
                        
                        if (descType == 'function')
                            descriptors.push(descriptor.meta ? descriptor : descriptor())
                        else
                            if (descType == 'object')
                                if (descriptor.token)
                                    descriptors.push(eval(descriptor.token)) 
                                else
                                    Joose.O.each(descriptor, function (version, name) { 
                                        descriptors.push(eval(name)) 
                                    })
                            else 
                                if (descType == 'string')
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
        }
    }
})


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})


Joose.Namespace.Keeper.meta.extend({
    
    after: {
        
        copyNamespaceState: function (targetClass) {
            targetClass.meta.resource = this.resource
        }
    }
})