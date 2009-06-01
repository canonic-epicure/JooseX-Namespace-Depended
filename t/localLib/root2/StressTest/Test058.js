var declared = false
try {
	declared = typeof StressTest.Test058 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test058"


Class('StressTest.Test058', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test066',
	       'StressTest.Test072',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 58 }
	},
	
	body : function(){
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test058" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test058" 
	}
})
