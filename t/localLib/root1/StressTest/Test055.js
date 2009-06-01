var declared = false
try {
	declared = typeof StressTest.Test055 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test055"


Class('StressTest.Test055', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test056',
	       'StressTest.Test058',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test077',
	       'StressTest.Test092',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 55 }
	},
	
	body : function(){
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test055" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test055" 
	}
})
