Joose.Namespace.Keeper.meta.extend({
    
    after: {
        
        copyNamespaceState: function (targetClass) {
            
            targetClass.meta.resource = this.resource
        }
    }
})