var declared = false
try {
	declared = typeof StressTest.Test061 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test061"


Class('StressTest.Test061', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test062',
	       'StressTest.Test066',
	       'StressTest.Test070',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test082',
	       'StressTest.Test087',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 61 }
	},
	
	body : function(){
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test061" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test061" 
	}
})
