Class('WithDependedMy', {
    
    version : 0.1,
    
    my : {
        
        use : [ 'Chain1' ],
        
        methods : {
            result : function () { return 'withDependedMy' }
        }
    }
})
