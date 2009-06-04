COMPONENTS = {
    
    "kernel" : [
        "JooseX.Namespace.Depended.Manager",
        "JooseX.Namespace.Depended.Resource",
        "JooseX.Namespace.Depended"
    ],
    
    
    "web" : [
        "+kernel",
    
        "JooseX.Namespace.Depended.Transport.AjaxAsync",
        "JooseX.Namespace.Depended.Transport.ScriptTag",
        
        "JooseX.Namespace.Depended.Materialize.Code",
        //"JooseX.Namespace.Depended.Materialize.Script",
    
        "JooseX.Namespace.Depended.Resource.URL",
        "JooseX.Namespace.Depended.Resource.URL.JS",
        "JooseX.Namespace.Depended.Resource.JS",
        "JooseX.Namespace.Depended.Resource.JS.External"
    ],
	
    
	//backward-compat
    "core" : [
        "+web"
	],
    
    
    "serverjs" : [
        "+kernel",
        
        "JooseX.Namespace.Depended.Materialize.Code",
        
        "JooseX.Namespace.Depended.Transport.Require",
        "JooseX.Namespace.Depended.Resource.Require"
    ]
	
} 

