var declared = false
try {
	declared = typeof StressTest.Test001 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test001"


Class('StressTest.Test001', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test038',
	       'StressTest.Test047',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 1 }
	},
	
	body : function(){
			if (typeof StressTest.Test038 != 'function') throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test001" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test001" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test001" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test001" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test001" 
	}
})
