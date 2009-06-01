var declared = false
try {
	declared = typeof StressTest.Test008 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test008"


Class('StressTest.Test008', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test012',
	       'StressTest.Test015',
	       'StressTest.Test021',
	       'StressTest.Test025',
	       'StressTest.Test031',
	       'StressTest.Test032',
	       'StressTest.Test033',
	       'StressTest.Test036',
	       'StressTest.Test046',
	       'StressTest.Test052',
	       'StressTest.Test056',
	       'StressTest.Test071',
	       'StressTest.Test074'
	],
	
	methods : {
		result : function () { return 8 }
	},
	
	body : function(){
			if (typeof StressTest.Test012 != 'function') throw "Dependency StressTest.Test012 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test015 != 'function') throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test021 != 'function') throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test025 != 'function') throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test031 != 'function') throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test033 != 'function') throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test036 != 'function') throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test052 != 'function') throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test008" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test008" 
	}
})
