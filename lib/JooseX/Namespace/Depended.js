Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProps' ],
    
    have : {
        version             : null,
        
        resource            : null,
        
        containResources    : [ 'isa', 'does', 'metaRole', 'metaRoles', 'trait', 'traits' ]
    },
    
    
    override: {
        
        prepareProps: function (extend) {
            var me = this
            extend = extend || {}
            
            //the case of pure namespace keeper creation (not Module) - such keeper should not have a resource
            if (this instanceof Joose.Namespace.Keeper && Joose.O.isEmpty(extend)) return this.SUPER(extend)
            
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
                
                var extendUse = Joose.O.wantArray(extend.use || [])
                var extendMy = extend.my
                
                //gathering all the related resourses from various builders
                //also gathering resourses of 'my'
                Joose.A.each(this.containResources, function (propName) {
                    if (extend[propName])
                        Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor) {
                            
                            if (typeof descriptor != 'function') extendUse.push(descriptor)
                        })
                        
                    if (extendMy && extendMy[propName])
                        Joose.A.each(Joose.O.wantArray(extendMy[propName]), function (descriptor) {
                            
                            if (typeof descriptor != 'function') extendUse.push(descriptor)
                        })
                })
                
                //and from 'use' builder
                if (extendMy && extendMy.use) {
                    extendUse.push.apply(extendUse, Joose.O.wantArray(extendMy.use))
                    
                    delete extendMy.use
                }
                
                //and from externally collected additional resources 
                extendUse = extendUse.concat(this.alsoDependsFrom(extend))
                
                
                Joose.A.each(extendUse, function (descriptor) {
                    resource.addDescriptor(descriptor)
                })
                delete extend.use
            
                //unshift is critical for correct order of readyListerens processing!
                //constructing is delaying until module will become ready 
                resource.readyListeners.unshift(function () {
                    me.construct(extend)
                })
                
                resource.handleDependencies()
                
                return false
                
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
                
                return this.SUPER(extend)
            }
        }
        //eof construct
    },
    //eof override
    
    methods : {
        
        alsoDependsFrom : function (extend) {
            return []
        },
        
        
        collectDependenciesFrom : function () {
            var result = []
            
            Joose.A.each(arguments, function (argument) {
                Joose.A.each(Joose.O.wantArray(argument), function (descriptor) {
                    if (typeof descriptor != 'function') result.push(descriptor)
                    
                })
            })
            
            return result
        }
    }
})

Joose.Managed.Bootstrap.meta.extend({
    does : JooseX.Namespace.Depended
})