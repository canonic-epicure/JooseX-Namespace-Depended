Class('JooseX.Namespace.Depended.Resource.JavaScript.ExternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    does : [ JooseX.Namespace.Depended.Resource.URLed, JooseX.Namespace.Depended.Transport.ScriptTag ],

    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (!/^http/.test(url) && !/^\//.test(url)) throw "Can't use relative URL for resource [" + this + "]"
        }
    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('exturl', JooseX.Namespace.Depended.Resource.JavaScript.ExternalURL)