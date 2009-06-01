var declared = false
try {
	declared = typeof StressTest.Test014 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test014"


Class('StressTest.Test014', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test024',
	       'StressTest.Test035',
	       'StressTest.Test048',
	       'StressTest.Test066',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test085',
	       'StressTest.Test088',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 14 }
	},
	
	body : function(){
			if (typeof StressTest.Test024 != 'function') throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test048 != 'function') throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test014" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test014" 
	}
})
