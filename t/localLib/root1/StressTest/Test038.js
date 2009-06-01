var declared = false
try {
	declared = typeof StressTest.Test038 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test038"


Class('StressTest.Test038', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test046',
	       'StressTest.Test057',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test065',
	       'StressTest.Test067',
	       'StressTest.Test077',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test095',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 38 }
	},
	
	body : function(){
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test057 != 'function') throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test038" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test038" 
	}
})
