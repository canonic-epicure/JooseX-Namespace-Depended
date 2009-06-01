var declared = false
try {
	declared = typeof StressTest.Test069 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test069"


Class('StressTest.Test069', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test076',
	       'StressTest.Test081',
	       'StressTest.Test097',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 69 }
	},
	
	body : function(){
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test069" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test069" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test069" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test069" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test069" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test069" 
	}
})
