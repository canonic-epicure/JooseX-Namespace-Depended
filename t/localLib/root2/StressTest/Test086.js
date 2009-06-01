var declared = false
try {
	declared = typeof StressTest.Test086 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test086"


Class('StressTest.Test086', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 86 }
	},
	
	body : function(){
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test086" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test086" 
	}
})
