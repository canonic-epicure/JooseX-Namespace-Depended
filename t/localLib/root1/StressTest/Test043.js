var declared = false
try {
	declared = typeof StressTest.Test043 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test043"


Class('StressTest.Test043', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test058',
	       'StressTest.Test060',
	       'StressTest.Test063',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 43 }
	},
	
	body : function(){
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test043" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test043" 
	}
})
