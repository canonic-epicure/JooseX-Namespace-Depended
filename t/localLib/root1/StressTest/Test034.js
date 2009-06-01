var declared = false
try {
	declared = typeof StressTest.Test034 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test034"


Class('StressTest.Test034', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test035',
	       'StressTest.Test041',
	       'StressTest.Test045',
	       'StressTest.Test051',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test088',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 34 }
	},
	
	body : function(){
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test041 != 'function') throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test045 != 'function') throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test051 != 'function') throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test034" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test034" 
	}
})
