var declared = false
try {
	declared = typeof StressTest.Test007 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test007"


Class('StressTest.Test007', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test012',
	       'StressTest.Test019',
	       'StressTest.Test020',
	       'StressTest.Test044',
	       'StressTest.Test046',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test087',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 7 }
	},
	
	body : function(){
			if (typeof StressTest.Test012 != 'function') throw "Dependency StressTest.Test012 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test019 != 'function') throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test020 != 'function') throw "Dependency StressTest.Test020 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test007" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test007" 
	}
})
