var declared = false
try {
	declared = typeof StressTest.Test015 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test015"


Class('StressTest.Test015', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test041',
	       'StressTest.Test042',
	       'StressTest.Test053',
	       'StressTest.Test090',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 15 }
	},
	
	body : function(){
			if (typeof StressTest.Test022 != 'function') throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test015" 
			if (typeof StressTest.Test041 != 'function') throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test015" 
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test015" 
			if (typeof StressTest.Test053 != 'function') throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test015" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test015" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test015" 
	}
})
