var declared = false
try {
	declared = typeof StressTest.Test023 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test023"


Class('StressTest.Test023', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test031',
	       'StressTest.Test034',
	       'StressTest.Test039',
	       'StressTest.Test042',
	       'StressTest.Test047',
	       'StressTest.Test048',
	       'StressTest.Test056',
	       'StressTest.Test060',
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test086',
	       'StressTest.Test091',
	       'StressTest.Test095',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 23 }
	},
	
	body : function(){
			if (typeof StressTest.Test031 != 'function') throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test034 != 'function') throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test039 != 'function') throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test048 != 'function') throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test023" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test023" 
	}
})
