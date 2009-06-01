//if (window.Chain1 && typeof Chain1.Middle.Chain2 == 'function') throw "Double declaration of Chain1.Middle.Chain2";

Class('Chain1.Middle.Chain2', {
	version : 0.1,
	
	methods : {
		result : function () { return 2 }
	}
	
})
