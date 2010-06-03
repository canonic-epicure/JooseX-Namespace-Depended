Class('JooseX.Namespace.Depended.Resource.NonJoose', {
    
    isa : JooseX.Namespace.Depended.Resource.JooseClass,
    
    
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
        },
        
        
        isReady : function () {
            return this.isLoaded()
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('nonjoose', JooseX.Namespace.Depended.Resource.NonJoose)
