var declared = false
try {
	declared = typeof StressTest.Test068 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test068"


Class('StressTest.Test068', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test084',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test096',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 68 }
	},
	
	body : function(){
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test079 != 'function') throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test092 != 'function') throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test068" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test068" 
	}
})
