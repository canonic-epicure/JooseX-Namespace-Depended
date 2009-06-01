var declared = false
try {
	declared = typeof StressTest.Test054 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test054"


Class('StressTest.Test054', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test056',
	       'StressTest.Test058',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test080',
	       'StressTest.Test089',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 54 }
	},
	
	body : function(){
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test054" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test054" 
	}
})
