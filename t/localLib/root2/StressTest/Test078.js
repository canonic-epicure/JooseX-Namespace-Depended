var declared = false
try {
	declared = typeof StressTest.Test078 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test078"


Class('StressTest.Test078', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test094',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 78 }
	},
	
	body : function(){
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test078" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test078" 
	}
})
