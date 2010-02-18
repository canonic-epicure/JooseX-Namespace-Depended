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
        
        "JooseX.Namespace.Depended.Resource.JooseClass",
        "JooseX.Namespace.Depended.Resource.NonJoose",
        
        "JooseX.Namespace.Depended.Resource.URLed",
        "JooseX.Namespace.Depended.Resource.ExternalURL",
        "JooseX.Namespace.Depended.Resource.InternalURL",
        
        
        //should be the last        
        "JooseX.Namespace.Depended"
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

