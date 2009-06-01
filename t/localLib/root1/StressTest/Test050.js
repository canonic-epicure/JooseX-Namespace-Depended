var declared = false
try {
	declared = typeof StressTest.Test050 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test050"


Class('StressTest.Test050', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test055',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 50 }
	},
	
	body : function(){
			if (typeof StressTest.Test051 != 'function') throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test050" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test050" 
	}
})
