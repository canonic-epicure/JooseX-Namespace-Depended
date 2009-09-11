Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC                          : [ 'lib', '/inc' ],
			
			disableCaching               : true,
            
            resources                    : {},
            
            resourceTypes                : {},
            
            ANONYMOUS_CLASS_COUNTER      : 0
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
            
            
	        use : function (dependenciesInfo, callback, scope) {
                var nsManager = Joose.Namespace.Manager.my
                var global = nsManager.global
                
                new Joose.Namespace.Keeper(null, {
	                use    : dependenciesInfo,
	                body   : function () {
                        
	                    if (callback) nsManager.executeIn(global, callback, global.meta.ns.container, [ global ])
	                }
	            })
	        }
            
        }
    }
    
})

use = function (dependenciesInfo, callback, scope) {
    JooseX.Namespace.Depended.Manager.my.use(dependenciesInfo, callback, scope) 
}


Joose.FutureClass = function (className) { return function () { return eval(className) } }
