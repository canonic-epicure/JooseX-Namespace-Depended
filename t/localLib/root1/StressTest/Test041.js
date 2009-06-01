var declared = false
try {
	declared = typeof StressTest.Test041 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test041"


Class('StressTest.Test041', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test043',
	       'StressTest.Test050',
	       'StressTest.Test055',
	       'StressTest.Test070',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test083',
	       'StressTest.Test087',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 41 }
	},
	
	body : function(){
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test050 != 'function') throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test075 != 'function') throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test041" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test041" 
	}
})
