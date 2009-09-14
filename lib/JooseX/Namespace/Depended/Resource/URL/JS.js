Class('JooseX.Namespace.Depended.Resource.URL.JS', {
    
    isa : JooseX.Namespace.Depended.Resource.URL,
    
    does : [ JooseX.Namespace.Depended.Transport.ScriptTag ]

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('jsurl', JooseX.Namespace.Depended.Resource.URL.JS)
