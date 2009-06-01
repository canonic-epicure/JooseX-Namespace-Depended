var declared = false
try {
	declared = typeof StressTest.Test009 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test009"


Class('StressTest.Test009', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test031',
	       'StressTest.Test035',
	       'StressTest.Test041',
	       'StressTest.Test043',
	       'StressTest.Test055',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test085',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 9 }
	},
	
	body : function(){
			if (typeof StressTest.Test031 != 'function') throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test041 != 'function') throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test009" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test009" 
	}
})
