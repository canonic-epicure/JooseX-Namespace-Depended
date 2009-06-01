var declared = false
try {
	declared = typeof StressTest.Test028 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test028"


Class('StressTest.Test028', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test035',
	       'StressTest.Test036',
	       'StressTest.Test044',
	       'StressTest.Test052',
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test087',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 28 }
	},
	
	body : function(){
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test036 != 'function') throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test052 != 'function') throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test028" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test028" 
	}
})
