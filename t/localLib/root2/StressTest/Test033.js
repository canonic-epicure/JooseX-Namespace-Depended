var declared = false
try {
	declared = typeof StressTest.Test033 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test033"


Class('StressTest.Test033', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test034',
	       'StressTest.Test036',
	       'StressTest.Test039',
	       'StressTest.Test047',
	       'StressTest.Test061',
	       'StressTest.Test062',
	       'StressTest.Test066',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test077',
	       'StressTest.Test086',
	       'StressTest.Test090',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 33 }
	},
	
	body : function(){
			if (typeof StressTest.Test034 != 'function') throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test036 != 'function') throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test039 != 'function') throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test062 != 'function') throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test066 != 'function') throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test077 != 'function') throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test086 != 'function') throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test033" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test033" 
	}
})
