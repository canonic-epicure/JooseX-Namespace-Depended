var declared = false
try {
	declared = typeof StressTest.Test030 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test030"


Class('StressTest.Test030', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test041',
	       'StressTest.Test050',
	       'StressTest.Test052',
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test073',
	       'StressTest.Test089',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 30 }
	},
	
	body : function(){
			if (typeof StressTest.Test041 != 'function') throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test050 != 'function') throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test052 != 'function') throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test030" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test030" 
	}
})
