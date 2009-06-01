var declared = false
try {
	declared = typeof StressTest.Test018 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test018"


Class('StressTest.Test018', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test024',
	       'StressTest.Test031',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test073',
	       'StressTest.Test084',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 18 }
	},
	
	body : function(){
			if (typeof StressTest.Test024 != 'function') throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test031 != 'function') throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test071 != 'function') throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test084 != 'function') throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test094 != 'function') throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test096 != 'function') throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test097 != 'function') throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test018" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test018" 
	}
})
