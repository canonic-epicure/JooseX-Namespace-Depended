var declared = false
try {
	declared = typeof StressTest.Test047 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test047"


Class('StressTest.Test047', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test061',
	       'StressTest.Test065',
	       'StressTest.Test072'
	],
	
	methods : {
		result : function () { return 47 }
	},
	
	body : function(){
			if (typeof StressTest.Test051 != 'function') throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test047" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test047" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test047" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test047" 
	}
})
