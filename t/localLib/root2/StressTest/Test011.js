var declared = false
try {
	declared = typeof StressTest.Test011 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test011"


Class('StressTest.Test011', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test038',
	       'StressTest.Test040',
	       'StressTest.Test069',
	       'StressTest.Test075',
	       'StressTest.Test088',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 11 }
	},
	
	body : function(){
			if (typeof StressTest.Test030 != 'function') throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test038 != 'function') throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test040 != 'function') throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test011" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test011" 
	}
})
