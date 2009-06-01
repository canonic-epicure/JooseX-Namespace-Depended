var declared = false
try {
	declared = typeof StressTest.Test006 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test006"


Class('StressTest.Test006', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test010',
	       'StressTest.Test015',
	       'StressTest.Test029',
	       'StressTest.Test036',
	       'StressTest.Test039',
	       'StressTest.Test045',
	       'StressTest.Test046',
	       'StressTest.Test047',
	       'StressTest.Test061',
	       'StressTest.Test064',
	       'StressTest.Test085'
	],
	
	methods : {
		result : function () { return 6 }
	},
	
	body : function(){
			if (typeof StressTest.Test010 != 'function') throw "Dependency StressTest.Test010 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test015 != 'function') throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test029 != 'function') throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test036 != 'function') throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test039 != 'function') throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test045 != 'function') throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test046 != 'function') throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test047 != 'function') throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test061 != 'function') throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test064 != 'function') throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test006" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test006" 
	}
})
