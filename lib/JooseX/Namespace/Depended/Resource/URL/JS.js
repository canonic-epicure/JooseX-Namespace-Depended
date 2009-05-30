Class('JooseX.Namespace.Depended.Resource.URL.JS', {
    
    isa : JooseX.Namespace.Depended.Resource.URL,
    
    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Code ],
    
    
    after: {
        
        initialize: function () {
            var url = this.token
            
            if (/^http/.test(url)) JooseX.Namespace.Depended.Transport.ScriptTag.meta.apply(this)
        }
        
    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('jsurl', JooseX.Namespace.Depended.Resource.URL.JS)
