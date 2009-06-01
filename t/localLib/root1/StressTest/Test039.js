var declared = false
try {
	declared = typeof StressTest.Test039 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test039"


Class('StressTest.Test039', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test042',
	       'StressTest.Test058',
	       'StressTest.Test064',
	       'StressTest.Test070',
	       'StressTest.Test083'
	],
	
	methods : {
		result : function () { return 39 }
	},
	
	body : function(){
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test039" 
			if (typeof StressTest.Test058 != 'function') throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test039" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test039" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test039" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test039" 
	}
})
