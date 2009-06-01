var declared = false
try {
	declared = typeof StressTest.Test026 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test026"


Class('StressTest.Test026', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test035',
	       'StressTest.Test043',
	       'StressTest.Test053',
	       'StressTest.Test055',
	       'StressTest.Test060',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test088',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 26 }
	},
	
	body : function(){
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test053 != 'function') throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test060 != 'function') throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test026" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test026" 
	}
})
