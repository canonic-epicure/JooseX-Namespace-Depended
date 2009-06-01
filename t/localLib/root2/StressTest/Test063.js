var declared = false
try {
	declared = typeof StressTest.Test063 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test063"


Class('StressTest.Test063', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test070',
	       'StressTest.Test073',
	       'StressTest.Test080',
	       'StressTest.Test094',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 63 }
	},
	
	body : function(){
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test063" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test063" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test063" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test063" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test063" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test063" 
	}
})
