var declared = false
try {
	declared = typeof StressTest.Test064 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test064"


Class('StressTest.Test064', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test068',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test081',
	       'StressTest.Test085'
	],
	
	methods : {
		result : function () { return 64 }
	},
	
	body : function(){
			if (typeof StressTest.Test068 != 'function') throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test064" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test064" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test064" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test064" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test064" 
	}
})
