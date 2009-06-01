var declared = false
try {
	declared = typeof StressTest.Test037 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test037"


Class('StressTest.Test037', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test042',
	       'StressTest.Test047',
	       'StressTest.Test060',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test090',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 37 }
	},
	
	body : function(){
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test037" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test037" 
	}
})
