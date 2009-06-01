var declared = false
try {
	declared = typeof StressTest.Test079 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test079"


Class('StressTest.Test079', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 79 }
	},
	
	body : function(){
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test079" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test079" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test079" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test079" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test079" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test079" 
	}
})
