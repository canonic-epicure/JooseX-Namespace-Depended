var declared = false
try {
	declared = typeof StressTest.Test057 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test057"


Class('StressTest.Test057', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test091',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 57 }
	},
	
	body : function(){
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test057" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test057" 
	}
})
