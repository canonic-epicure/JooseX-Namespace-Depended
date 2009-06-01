var declared = false
try {
	declared = typeof StressTest.Test016 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test016"


Class('StressTest.Test016', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test030',
	       'StressTest.Test048',
	       'StressTest.Test054',
	       'StressTest.Test062',
	       'StressTest.Test063',
	       'StressTest.Test065',
	       'StressTest.Test079'
	],
	
	methods : {
		result : function () { return 16 }
	},
	
	body : function(){
			if (typeof StressTest.Test022 != 'function') throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test030 != 'function') throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test048 != 'function') throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test016" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test016" 
	}
})
