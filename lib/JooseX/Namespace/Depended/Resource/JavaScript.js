Class('JooseX.Namespace.Depended.Resource.JavaScript', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Transport.XHRAsync, JooseX.Namespace.Depended.Materialize.Eval ]
})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('javascript', JooseX.Namespace.Depended.Resource.JavaScript)
