var declared = false
try {
	declared = typeof StressTest.Test059 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test059"


Class('StressTest.Test059', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test063',
	       'StressTest.Test071',
	       'StressTest.Test078',
	       'StressTest.Test082',
	       'StressTest.Test094',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 59 }
	},
	
	body : function(){
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test059" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test059" 
	}
})
