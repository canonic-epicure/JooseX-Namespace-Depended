Class('JooseX.Namespace.Depended.Resource.JS.External', {
    
    isa : JooseX.Namespace.Depended.Resource.JS,
    
    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Code ],
    
    
    have : {
        presence : null
    },
    
    
    after: {
        
        initialize: function () {
            var me = this
            
            if (!this.presence) this.presence = function () {
                return eval(me.token)
            }
        }
        
    },

    
    methods : {
        
        isLoaded : function () {
            var isPresent = false
            
            try {
                isPresent = this.presence()
            } catch (e) {
            }
            
            return isPresent || this.SUPER()
        }
        
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('ext', JooseX.Namespace.Depended.Resource.JS.External)
