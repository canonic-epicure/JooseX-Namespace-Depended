var declared = false
try {
	declared = typeof StressTest.Test022 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test022"


Class('StressTest.Test022', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test028',
	       'StressTest.Test031',
	       'StressTest.Test032',
	       'StressTest.Test058',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test072',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 22 }
	},
	
	body : function(){
			if (typeof StressTest.Test028 != 'function') throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test031 != 'function') throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test022" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test022" 
	}
})
