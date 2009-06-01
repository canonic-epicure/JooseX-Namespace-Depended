var declared = false
try {
	declared = typeof StressTest.Test076 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test076"


Class('StressTest.Test076', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 76 }
	},
	
	body : function(){
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test076" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test076" 
	}
})
