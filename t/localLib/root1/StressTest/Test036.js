var declared = false
try {
	declared = typeof StressTest.Test036 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test036"


Class('StressTest.Test036', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test040',
	       'StressTest.Test044',
	       'StressTest.Test048',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test071',
	       'StressTest.Test088',
	       'StressTest.Test091',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 36 }
	},
	
	body : function(){
			if (typeof StressTest.Test040 != 'function') throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test048 != 'function') throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test036" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test036" 
	}
})
