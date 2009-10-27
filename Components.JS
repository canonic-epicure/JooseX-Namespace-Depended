COMPONENTS = {
    
    "Kernel" : [
        "JooseX.Namespace.Depended.Manager",
    
        "JooseX.Namespace.Depended.Resource"
    ],
    
    
    "Web" : [
        "+Kernel",
    
        "JooseX.Namespace.Depended.Materialize.Eval",
        "JooseX.Namespace.Depended.Materialize.ScriptTag",
        
        "JooseX.Namespace.Depended.Transport.XHRAsync",
        "JooseX.Namespace.Depended.Transport.XHRSync",
        "JooseX.Namespace.Depended.Transport.ScriptTag",
        
        "JooseX.Namespace.Depended.Resource.JavaScript",
        "JooseX.Namespace.Depended.Resource.JavaScript.JooseClass",
        "JooseX.Namespace.Depended.Resource.JavaScript.NonJoose",
        
        "JooseX.Namespace.Depended.Resource.URLed",
        "JooseX.Namespace.Depended.Resource.JavaScript.ExternalURL",
        "JooseX.Namespace.Depended.Resource.JavaScript.InternalURL",
        
        
        //should be the last        
        "JooseX.Namespace.Depended",
        "JooseX.Namespace.Depended.Meta"
    ]
    
//    ,
//    "ServerJS" : [
//        "+Kernel",
//        
//        "JooseX.Namespace.Depended.Transport.Require",
//        "JooseX.Namespace.Depended.Resource.Require",
//        
//        //should be the last
//        "JooseX.Namespace.Depended"
//    ]
    
} 

