Class('JooseX.Namespace.Depended.Resource.JavaScript.InternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    does : JooseX.Namespace.Depended.Resource.URLed,
    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) throw "Can't use absolute URL for resource [" + this + "]"
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('inturl', JooseX.Namespace.Depended.Resource.JavaScript.InternalURL)