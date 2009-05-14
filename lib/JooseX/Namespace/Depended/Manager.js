Role('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC : [ ['../localLib/root1'], ['../localLib/root2'] ],
			
			disableCaching : true,
            
            virtual : null
    	},

    	
        methods : {
            
	        prepareVirtual: function (name) {
                if (!this.virtual) this.virtual = {}
                
	            if (this.virtual[name]) return this.virtual[name]
	            
	            return this.virtual[name] = new Joose.Namespace.Keeper(name).c
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


Joose.Namespace.Manager.meta.extend({
	does : [ JooseX.Namespace.Depended.Manager ]
})


use = function(){
    Joose.Namespace.Manager.my.use.apply(Joose.Namespace.Manager.my, arguments)
}

