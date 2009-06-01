var declared = false
try {
	declared = typeof StressTest.Test060 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test060"


Class('StressTest.Test060', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test071',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test083',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test096',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 60 }
	},
	
	body : function(){
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test060" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test060" 
	}
})
