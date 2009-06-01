var declared = false
try {
	declared = typeof StressTest.Test025 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test025"


Class('StressTest.Test025', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test026',
	       'StressTest.Test040',
	       'StressTest.Test043',
	       'StressTest.Test046',
	       'StressTest.Test071',
	       'StressTest.Test078',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test090',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 25 }
	},
	
	body : function(){
			if (typeof StressTest.Test026 != 'function') throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test040 != 'function') throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test025" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test025" 
	}
})
