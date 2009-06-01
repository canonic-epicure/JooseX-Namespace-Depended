var declared = false
try {
	declared = typeof StressTest.Test053 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test053"


Class('StressTest.Test053', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test054',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test077',
	       'StressTest.Test078'
	],
	
	methods : {
		result : function () { return 53 }
	},
	
	body : function(){
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test053" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test053" 
	}
})
