var declared = false
try {
	declared = typeof StressTest.Test017 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test017"


Class('StressTest.Test017', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test021',
	       'StressTest.Test022',
	       'StressTest.Test037',
	       'StressTest.Test042',
	       'StressTest.Test044',
	       'StressTest.Test045',
	       'StressTest.Test047',
	       'StressTest.Test070',
	       'StressTest.Test088',
	       'StressTest.Test095',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 17 }
	},
	
	body : function(){
			if (typeof StressTest.Test021 != 'function') throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test022 != 'function') throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test037 != 'function') throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test042 != 'function') throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test044 != 'function') throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test045 != 'function') throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test095 != 'function') throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test017" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test017" 
	}
})
