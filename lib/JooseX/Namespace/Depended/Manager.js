Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC : [ 'lib', '/inc' ],
			
			disableCaching : true,
            
            resources : {},
            
            resourceTypes : {}
    	},

    	
        methods : {
            
            getResource : function (descriptor) {
                var type, name
                
                var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                
                if (!match) {
                    type = 'js'
                    name = descriptor
                } else {
                    type = match[1]
                    name = match[2]
                }
                
                var id = type + '://' + name
                
                if (this.resources[id]) return this.resources[id]
                
                
                var resourceClass = this.resourceTypes[type]
                
                return this.resources[id] = new resourceClass({ 
                    id : id, 
                    name : name
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

