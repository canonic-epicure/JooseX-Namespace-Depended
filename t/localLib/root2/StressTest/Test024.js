var declared = false
try {
	declared = typeof StressTest.Test024 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test024"


Class('StressTest.Test024', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test045',
	       'StressTest.Test052',
	       'StressTest.Test055',
	       'StressTest.Test070',
	       'StressTest.Test078',
	       'StressTest.Test087',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 24 }
	},
	
	body : function(){
			if (typeof StressTest.Test045 != 'function') throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test052 != 'function') throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test024" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test024" 
	}
})
