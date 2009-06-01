var declared = false
try {
	declared = typeof StressTest.Test010 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test010"


Class('StressTest.Test010', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test034',
	       'StressTest.Test039',
	       'StressTest.Test042',
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 10 }
	},
	
	body : function(){
			if (typeof StressTest.Test030 != 'function') throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test034 != 'function') throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test039 != 'function') throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test010" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test010" 
	}
})
