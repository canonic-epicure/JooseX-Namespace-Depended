var declared = false
try {
	declared = typeof StressTest.Test074 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test074"


Class('StressTest.Test074', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test076',
	       'StressTest.Test079',
	       'StressTest.Test081',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test092',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 74 }
	},
	
	body : function(){
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test074" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test074" 
	}
})
