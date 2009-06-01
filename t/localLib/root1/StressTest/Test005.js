var declared = false
try {
	declared = typeof StressTest.Test005 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test005"


Class('StressTest.Test005', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test027',
	       'StressTest.Test044',
	       'StressTest.Test046',
	       'StressTest.Test057',
	       'StressTest.Test058',
	       'StressTest.Test063',
	       'StressTest.Test070',
	       'StressTest.Test075',
	       'StressTest.Test082'
	],
	
	methods : {
		result : function () { return 5 }
	},
	
	body : function(){
			if (typeof StressTest.Test027 != 'function') throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test057 != 'function') throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test005" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test005" 
	}
})
