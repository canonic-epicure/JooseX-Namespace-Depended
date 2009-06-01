var declared = false
try {
	declared = typeof StressTest.Test019 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test019"


Class('StressTest.Test019', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test028',
	       'StressTest.Test040',
	       'StressTest.Test043',
	       'StressTest.Test044',
	       'StressTest.Test047',
	       'StressTest.Test053',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test093',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 19 }
	},
	
	body : function(){
			if (typeof StressTest.Test028 != 'function') throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test040 != 'function') throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test053 != 'function') throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test019" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test019" 
	}
})
