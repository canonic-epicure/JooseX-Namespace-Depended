var declared = false
try {
	declared = typeof StressTest.Test020 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test020"


Class('StressTest.Test020', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test027',
	       'StressTest.Test051',
	       'StressTest.Test061',
	       'StressTest.Test087',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 20 }
	},
	
	body : function(){
			if (typeof StressTest.Test027 != 'function') throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test020" 
			if (typeof StressTest.Test051 != 'function') throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test020" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test020" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test020" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test020" 
	}
})
