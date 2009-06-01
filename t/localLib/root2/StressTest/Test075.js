var declared = false
try {
	declared = typeof StressTest.Test075 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test075"


Class('StressTest.Test075', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test081',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test096',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 75 }
	},
	
	body : function(){
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test075" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test075" 
	}
})
