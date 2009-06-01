var declared = false
try {
	declared = typeof StressTest.Test072 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test072"


Class('StressTest.Test072', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test087',
	       'StressTest.Test092',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 72 }
	},
	
	body : function(){
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test072" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test072" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test072" 
			if (typeof StressTest.Test087 != 'function') throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test072" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test072" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test072" 
	}
})
