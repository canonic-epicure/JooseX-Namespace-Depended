var declared = false
try {
	declared = typeof StressTest.Test027 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test027"


Class('StressTest.Test027', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test037',
	       'StressTest.Test044',
	       'StressTest.Test050',
	       'StressTest.Test058',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 27 }
	},
	
	body : function(){
			if (typeof StressTest.Test037 != 'function') throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test050 != 'function') throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test027" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test027" 
	}
})
