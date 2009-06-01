var declared = false
try {
	declared = typeof StressTest.Test031 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test031"


Class('StressTest.Test031', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test037',
	       'StressTest.Test061',
	       'StressTest.Test079',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 31 }
	},
	
	body : function(){
			if (typeof StressTest.Test037 != 'function') throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test031" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test031" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test031" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test031" 
	}
})
