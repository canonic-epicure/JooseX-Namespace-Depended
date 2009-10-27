Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProperties' ],
    
    
    have : {
        containResources                    : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ]
    },

    
    override: {
        
        prepareProperties : function (name, extend, defaultMeta) {
            
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
            this.alsoDependsFrom(extend, summaredDeps)
            
            var resource = JooseX.Namespace.Depended.Manager.my.getResource({
                type : 'joose',
                token : name
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
                me.construct(name, extend, resource, defaultMeta)
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
        
        alsoDependsFrom : function (extend, summaredDeps) {
            return []
        },
        
        
        collectDependencies : function (from, to) {
            Joose.A.each(Joose.O.wantArray(from), function (descriptor) {
                if (descriptor && typeof descriptor != 'function') to.push(descriptor)
            })
        },
        
        
        construct : function (name, extend, resource, defaultMeta) {
            this.inlineDependencies(extend)
            
            var extendMy = extend.my
            
            if (extendMy) this.inlineDependencies(extendMy)
            
            var meta = extend.meta
            delete extend.meta
            
            if (!meta)
                if (extend.isa) 
                    meta = extend.isa.meta.constructor
                else
                    meta = defaultMeta
            
            this.create(name, meta, extend)
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
        }
    
    }
})


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})

