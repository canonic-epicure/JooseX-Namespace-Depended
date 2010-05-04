COMPONENTS = {
    
    "Kernel" : [
        "JooseX.Namespace.Depended.Manager",
    
        "JooseX.Namespace.Depended.Resource",
        
        "JooseX.Namespace.Depended.Materialize.Eval",
        
        "JooseX.Namespace.Depended.Resource.JooseClass",
        "JooseX.Namespace.Depended.Resource.NonJoose"
    ],
    
    
    "Web" : [
        "+Kernel",
    
        
        "JooseX.Namespace.Depended.Materialize.ScriptTag",
        
        "JooseX.Namespace.Depended.Transport.XHRAsync",
        "JooseX.Namespace.Depended.Transport.XHRSync",
        "JooseX.Namespace.Depended.Transport.ScriptTag",
        
        
        "JooseX.Namespace.Depended.Locator.URL",
        "JooseX.Namespace.Depended.Resource.ExternalURL",
        "JooseX.Namespace.Depended.Resource.InternalURL",
        
        "JooseX.Namespace.Depended.Bootstrap.Web",
        
        
        //should be the last        
        "JooseX.Namespace.Depended"
    ],
    
    "NodeJS" : [
        "+Kernel",
    
        "JooseX.Namespace.Depended.Transport.NodeJS",
        "JooseX.Namespace.Depended.Materialize.NodeJS",
        
        "JooseX.Namespace.Depended.Bootstrap.NodeJS",
        
        //should be the last        
        "JooseX.Namespace.Depended"
    ]
    
} 

