Class('JooseX.Namespace.Depended.Resource.InternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Locator.URL, JooseX.Namespace.Depended.Transport.XHRAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) throw "Can't use absolute URL for resource [" + this + "]"
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('inturl', JooseX.Namespace.Depended.Resource.InternalURL)