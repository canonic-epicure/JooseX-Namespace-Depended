COMPONENTS = {
    
    "kernel" : [
        "JooseX.Namespace.Depended.Manager",
        "JooseX.Namespace.Depended.Resource",
        
        "JooseX.Namespace.Depended.Materialize.Code"
    ],
    
    
    "web" : [
        "+kernel",
    
        "JooseX.Namespace.Depended.Transport.AjaxAsync",
        "JooseX.Namespace.Depended.Transport.AjaxSync",
        "JooseX.Namespace.Depended.Transport.ScriptTag",
        
        "JooseX.Namespace.Depended.Resource.URL",
        "JooseX.Namespace.Depended.Resource.URL.JS",
        "JooseX.Namespace.Depended.Resource.JS",
        "JooseX.Namespace.Depended.Resource.JS.External",
        
        //should be the last        
        "JooseX.Namespace.Depended"
    ],
	
    
	//backward-compat
    "core" : [
        "+web"
	],
    
    
    "serverjs" : [
        "+kernel",
        
        "JooseX.Namespace.Depended.Transport.Require",
        "JooseX.Namespace.Depended.Resource.Require",
        
        //should be the last
        "JooseX.Namespace.Depended"
    ]
	
} 

