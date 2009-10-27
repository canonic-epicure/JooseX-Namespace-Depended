Class('WithDependedMy2', {
    
    version : 0.1,
    
    does : 'BasicRole2',
    
    my : {
        
        use : [ 'Chain1' ],
        
        does : 'BasicRole3',
        
        sugar : 'yes please',
        
        methods : {
            result : function () { return 'withDependedMy2' }
        }
    }
})
