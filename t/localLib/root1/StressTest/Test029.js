var declared = false
try {
	declared = typeof StressTest.Test029 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test029"


Class('StressTest.Test029', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test042',
	       'StressTest.Test047',
	       'StressTest.Test055',
	       'StressTest.Test065',
	       'StressTest.Test068',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 29 }
	},
	
	body : function(){
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test029" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test029" 
	}
})
