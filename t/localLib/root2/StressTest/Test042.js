var declared = false
try {
	declared = typeof StressTest.Test042 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test042"


Class('StressTest.Test042', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test056',
	       'StressTest.Test059',
	       'StressTest.Test063',
	       'StressTest.Test065',
	       'StressTest.Test066',
	       'StressTest.Test069',
	       'StressTest.Test090',
	       'StressTest.Test093',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 42 }
	},
	
	body : function(){
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test042" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test042" 
	}
})
