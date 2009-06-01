var declared = false
try {
	declared = typeof StressTest.Test003 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test003"


Class('StressTest.Test003', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test015',
	       'StressTest.Test017',
	       'StressTest.Test026',
	       'StressTest.Test030',
	       'StressTest.Test032',
	       'StressTest.Test035',
	       'StressTest.Test036',
	       'StressTest.Test051',
	       'StressTest.Test054',
	       'StressTest.Test069',
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test090',
	       'StressTest.Test093',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 3 }
	},
	
	body : function(){
			if (typeof StressTest.Test015 != 'function') throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test017 != 'function') throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test026 != 'function') throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test030 != 'function') throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test036 != 'function') throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test051 != 'function') throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test054 != 'function') throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test003" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test003" 
	}
})
