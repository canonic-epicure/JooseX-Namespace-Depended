var declared = false
try {
	declared = typeof StressTest.Test035 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test035"


Class('StressTest.Test035', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test038',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test069',
	       'StressTest.Test074',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 35 }
	},
	
	body : function(){
			if (typeof StressTest.Test038 != 'function') throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test035" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test035" 
	}
})
