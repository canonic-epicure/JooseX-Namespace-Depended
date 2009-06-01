var declared = false
try {
	declared = typeof StressTest.Test044 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test044"


Class('StressTest.Test044', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test046',
	       'StressTest.Test047',
	       'StressTest.Test065',
	       'StressTest.Test072',
	       'StressTest.Test074',
	       'StressTest.Test077',
	       'StressTest.Test085',
	       'StressTest.Test093',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 44 }
	},
	
	body : function(){
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test065 != 'function') throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test044" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test044" 
	}
})
