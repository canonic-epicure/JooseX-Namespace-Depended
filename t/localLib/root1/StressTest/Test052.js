var declared = false
try {
	declared = typeof StressTest.Test052 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test052"


Class('StressTest.Test052', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test063',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 52 }
	},
	
	body : function(){
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test052" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test052" 
	}
})
