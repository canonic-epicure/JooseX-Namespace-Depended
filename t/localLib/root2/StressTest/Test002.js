var declared = false
try {
	declared = typeof StressTest.Test002 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test002"


Class('StressTest.Test002', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test010',
	       'StressTest.Test016',
	       'StressTest.Test035',
	       'StressTest.Test043',
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test078',
	       'StressTest.Test081',
	       'StressTest.Test089',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 2 }
	},
	
	body : function(){
			if (typeof StressTest.Test010 != 'function') throw "Dependency StressTest.Test010 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test016 != 'function') throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test035 != 'function') throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test043 != 'function') throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test055 != 'function') throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test056 != 'function') throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test073 != 'function') throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test078 != 'function') throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test002" 
			if (typeof StressTest.Test100 != 'function') throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test002" 
	}
})
