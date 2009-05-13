COMPONENTS = {
	
	"core" : [
	    "JooseX.Namespace.Depended",
	    "JooseX.Namespace.Depended.Manager",
	    "JooseX.Namespace.Depended.Transport.ScriptTag",
	    "JooseX.Namespace.Depended.Transport.AjaxAsync"
	],
	
	"grouped" : [
		"+core",
		
	    "Digest.MD5",
	    "JooseX.Namespace.Depended.Grouped"
	],
	
	
	"noncycled" : [
		"+core",
		
		"JooseX.Namespace.Depended.NonCycled"		
	]
} 

