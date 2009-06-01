var declared = false
try {
	declared = typeof StressTest.Test070 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test070"


Class('StressTest.Test070', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 70 }
	},
	
	body : function(){
			if (typeof StressTest.Test074 != 'function') throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test080 != 'function') throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test081 != 'function') throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test083 != 'function') throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test091 != 'function') throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test070" 
			if (typeof StressTest.Test099 != 'function') throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test070" 
	}
})
