var declared = false
try {
	declared = typeof StressTest.Test066 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test066"


Class('StressTest.Test066', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test069',
	       'StressTest.Test072',
	       'StressTest.Test078',
	       'StressTest.Test082',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test094',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 66 }
	},
	
	body : function(){
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test066" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test066" 
	}
})
