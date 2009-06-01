var declared = false
try {
	declared = typeof StressTest.Test067 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test067"


Class('StressTest.Test067', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test081',
	       'StressTest.Test085',
	       'StressTest.Test088',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 67 }
	},
	
	body : function(){
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test067" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test067" 
	}
})
