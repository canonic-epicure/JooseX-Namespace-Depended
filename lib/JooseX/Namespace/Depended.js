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
