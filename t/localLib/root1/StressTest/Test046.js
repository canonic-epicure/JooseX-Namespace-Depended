var declared = false
try {
	declared = typeof StressTest.Test046 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test046"


Class('StressTest.Test046', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test048',
	       'StressTest.Test054',
	       'StressTest.Test056',
	       'StressTest.Test059',
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test087',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 46 }
	},
	
	body : function(){
			if (typeof StressTest.Test048 != 'function') throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test046" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test046" 
	}
})
