var declared = false
try {
	declared = typeof StressTest.Test032 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test032"


Class('StressTest.Test032', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test043',
	       'StressTest.Test062',
	       'StressTest.Test063',
	       'StressTest.Test085',
	       'StressTest.Test088',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 32 }
	},
	
	body : function(){
			if (typeof StressTest.Test033 != 'function') throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test032" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test032" 
	}
})
