var declared = false
try {
	declared = typeof StressTest.Test004 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test004"


Class('StressTest.Test004', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test012',
	       'StressTest.Test016',
	       'StressTest.Test018',
	       'StressTest.Test032',
	       'StressTest.Test050',
	       'StressTest.Test059',
	       'StressTest.Test076',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 4 }
	},
	
	body : function(){
			if (typeof StressTest.Test012 != 'function') throw "Dependency StressTest.Test012 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test016 != 'function') throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test018 != 'function') throw "Dependency StressTest.Test018 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test050 != 'function') throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test004" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test004" 
	}
})
