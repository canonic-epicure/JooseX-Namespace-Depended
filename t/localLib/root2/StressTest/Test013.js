var declared = false
try {
	declared = typeof StressTest.Test013 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test013"


Class('StressTest.Test013', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test040',
	       'StressTest.Test054',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test085'
	],
	
	methods : {
		result : function () { return 13 }
	},
	
	body : function(){
			if (typeof StressTest.Test022 != 'function') throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test013" 
			if (typeof StressTest.Test040 != 'function') throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test013" 
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test013" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test013" 
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test013" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test013" 
	}
})
