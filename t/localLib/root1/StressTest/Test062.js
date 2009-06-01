var declared = false
try {
	declared = typeof StressTest.Test062 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test062"


Class('StressTest.Test062', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test063',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test080',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 62 }
	},
	
	body : function(){
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test062" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test062" 
	}
})
