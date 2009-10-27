Joose.Managed.Bootstrap.meta.extend({
    
    have : {
        resource            : null
    },
    
    
    after: {
        
        construct: function () {
            this.resource = this.resource || JooseX.Namespace.Depended.Manager.my.getMyResource('joose', this.name, this.c)
        }
    }
})


Joose.Namespace.Keeper.meta.extend({
    
    after: {
        
        copyNamespaceState: function (targetClass) {
            
            targetClass.meta.resource = this.resource
        }
    }
})