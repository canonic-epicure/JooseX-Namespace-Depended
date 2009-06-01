var declared = false
try {
	declared = typeof StressTest.Test012 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test012"


Class('StressTest.Test012', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test017',
	       'StressTest.Test022',
	       'StressTest.Test026',
	       'StressTest.Test028',
	       'StressTest.Test032',
	       'StressTest.Test050',
	       'StressTest.Test056',
	       'StressTest.Test063',
	       'StressTest.Test068',
	       'StressTest.Test072',
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 12 }
	},
	
	body : function(){
			if (typeof StressTest.Test017 != 'function') throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test022 != 'function') throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test026 != 'function') throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test028 != 'function') throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test032 != 'function') throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test050 != 'function') throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test063 != 'function') throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test012" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test012" 
	}
})
