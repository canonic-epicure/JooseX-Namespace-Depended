var declared = false
try {
	declared = typeof StressTest.Test051 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test051"


Class('StressTest.Test051', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test057',
	       'StressTest.Test059',
	       'StressTest.Test061',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test080',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 51 }
	},
	
	body : function(){
			if (typeof StressTest.Test057 != 'function') throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test059 != 'function') throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test051" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test051" 
	}
})
