var declared = false
try {
	declared = typeof StressTest.Test056 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test056"


Class('StressTest.Test056', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test058',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 56 }
	},
	
	body : function(){
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test056" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test056" 
	}
})
