COMPONENTS = {
    
    "Kernel" : [
        "JooseX.Namespace.Depended.Resource",
        "JooseX.Namespace.Depended.Resource.JavaScript",
        "JooseX.Namespace.Depended.Resource.JavaScript.JooseClass"
    ],
    
    
    "Web" : [
        "+Kernel",
    
        "JooseX.Namespace.Depended.Materialize.Eval",
        "JooseX.Namespace.Depended.Materialize.ScriptTag",
        
        "JooseX.Namespace.Depended.Transport.XHRAsync",
        "JooseX.Namespace.Depended.Transport.XHRSync",
        "JooseX.Namespace.Depended.Transport.ScriptTag",
        
        "JooseX.Namespace.Depended.Resource.URL",
        "JooseX.Namespace.Depended.Resource.URL.JS",
        "JooseX.Namespace.Depended.Resource.JS.External",
        
        //should be the last        
        "JooseX.Namespace.Depended.Manager"
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

