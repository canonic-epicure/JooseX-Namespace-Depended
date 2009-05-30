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
                var type, token
                
                var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                
                if (!match) {
                    type = 'js'
                    token = descriptor
                } else {
                    type = match[1]
                    token = match[2]
                }
                
                var id = type + '://' + token
                
                if (this.resources[id]) return this.resources[id]

                
                var resourceClass = this.resourceTypes[type]
                if (!resourceClass) throw "Unknown resource type: [" + type + "]"
                
                return this.resources[id] = new resourceClass({ 
                    id : id, 
                    token : token
                })
            },
            
            
            registerResourceClass : function (typeName, resourceClass) {
                this.resourceTypes[typeName] = resourceClass
            },
            
            
	        use: function (dependenciesInfo, callback, scope) {
	            new Joose.Namespace.Keeper(null, {
	                use: dependenciesInfo,
	                body: function () {
	                    callback.call(scope || this)
	                }
	            })
	        }
            
        }
    }
    
})

use = function () {
    JooseX.Namespace.Depended.Manager.my.use.apply(JooseX.Namespace.Depended.Manager.my, arguments)
}

