if (typeof Chain1 == 'function') throw "Double declaration of Chain1";

//debugger

Class('Chain1', {
	version : 0.1,
	
	use : 'Chain1.Middle.Chain2',
	
	methods : {
		result : function () { return 1 }
	}
	
})
