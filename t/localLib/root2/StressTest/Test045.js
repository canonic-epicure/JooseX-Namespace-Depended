var declared = false
try {
	declared = typeof StressTest.Test045 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test045"


Class('StressTest.Test045', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test049',
	       'StressTest.Test056',
	       'StressTest.Test057',
	       'StressTest.Test071',
	       'StressTest.Test083',
	       'StressTest.Test092',
	       'StressTest.Test097',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 45 }
	},
	
	body : function(){
			if (typeof StressTest.Test049 != 'function') throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test057 != 'function') throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test045" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test045" 
	}
})
