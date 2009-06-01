var declared = false
try {
	declared = typeof StressTest.Test048 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test048"


Class('StressTest.Test048', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test052',
	       'StressTest.Test056',
	       'StressTest.Test063',
	       'StressTest.Test064',
	       'StressTest.Test077',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 48 }
	},
	
	body : function(){
			if (typeof StressTest.Test052 != 'function') throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test048" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test048" 
	}
})
