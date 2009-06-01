var declared = false
try {
	declared = typeof StressTest.Test081 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test081"


Class('StressTest.Test081', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 81 }
	},
	
	body : function(){
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test081" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test081" 
	}
})
