var declared = false
try {
	declared = typeof StressTest.Test071 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test071"


Class('StressTest.Test071', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 71 }
	},
	
	body : function(){
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test071" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test071" 
	}
})
