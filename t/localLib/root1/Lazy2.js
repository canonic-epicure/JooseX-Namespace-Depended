LazyClass('Lazy2', {
    
    version : 0.01,
    
    use : [ 'Chain1.Middle.Chain2', 'WithDependedMy2'],
    
    methods : {
        result : function () { return 'lazy2' }
    } 

})