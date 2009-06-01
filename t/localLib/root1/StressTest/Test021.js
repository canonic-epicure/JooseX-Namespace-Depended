var declared = false
try {
	declared = typeof StressTest.Test021 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test021"


Class('StressTest.Test021', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test028',
	       'StressTest.Test037',
	       'StressTest.Test039',
	       'StressTest.Test045',
	       'StressTest.Test049',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test064',
	       'StressTest.Test076',
	       'StressTest.Test081',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 21 }
	},
	
	body : function(){
			if (typeof StressTest.Test023 != 'function') throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test028 != 'function') throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test037 != 'function') throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test039 != 'function') throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test045 != 'function') throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test049 != 'function') throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test076 != 'function') throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test021" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test021" 
	}
})
