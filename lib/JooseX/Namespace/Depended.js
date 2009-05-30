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
                    
                    if (extend[propName]) Joose.O.eachU(extend[propName], function (value) {
                        extend.use.unshift(value)
                    })
                })
                
                    
                Joose.A.each(extend.use, function (descriptor) {
                    resource.addDescriptor(descriptor)
                })
            
                //unshift is critical for correct order of readyListerens processing!
                //constructing is delaying until module will become ready 
                resource.readyListeners.unshift(function () {
                    me.construct(extend)
                })
                
                delete extend.use
                
                resource.processDependencies()
                
            } else {
                
                Joose.A.each(this.containResources, function (propName) {
                    
                    if (extend[propName]) Joose.O.eachU(extend[propName], function (value, index) {
                        
                        if (typeof value != 'function') {
                            var classString = value
                            
                            if (typeof classString == 'object') Joose.O.each(value, function (version, name) { classString = name })
                            
                            if (index) 
                                extend[propName][index] = eval(classString)
                            else
                                extend[propName] = eval(classString)
                        }
                    })
                })
                
                this.SUPER(extend)
            }
        }
    },
    
    
    builder : {
    	
    	override : {
	        
	        version: function (targetClassMeta, version) {
	            targetClassMeta.version = version
	        }
            
    	}
    },
    
    methods: {
        
        
    }
})


//Joose.Meta.Class.meta.extend({
//    does                        : [ JooseX.Namespace.Depended ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ JooseX.Namespace.Depended ]
//})
