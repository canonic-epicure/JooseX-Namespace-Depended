var declared = false
try {
	declared = typeof StressTest.Test065 == 'function'
} catch (e) {
}

if (declared) throw "Double declaration of StressTest.Test065"


Class('StressTest.Test065', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test067',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test072',
	       'StressTest.Test082',
	       'StressTest.Test085',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test093',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 65 }
	},
	
	body : function(){
			if (typeof StressTest.Test067 != 'function') throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test069 != 'function') throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test070 != 'function') throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test072 != 'function') throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test082 != 'function') throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test085 != 'function') throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test088 != 'function') throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test089 != 'function') throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test090 != 'function') throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test093 != 'function') throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test065" 
			if (typeof StressTest.Test098 != 'function') throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test065" 
	}
})
