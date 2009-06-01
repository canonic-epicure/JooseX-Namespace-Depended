var declared = false
try {
	declared = typeof StressTest.Test049 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test049"


Class('StressTest.Test049', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test062',
	       'StressTest.Test069',
	       'StressTest.Test071',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test088',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 49 }
	},
	
	body : function(){
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test049" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test049" 
	}
})
