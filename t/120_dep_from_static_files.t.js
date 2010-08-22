StartTest(function(t) {
    
    //==================================================================================================================================================================================
    t.diag("Testing of loading from static files")
    
    
    JooseX.Namespace.Depended.Manager.my.INC.unshift('../lib')
    
    if (!Joose.is_NodeJS) t.harness.absolutizeINC(JooseX.Namespace.Depended.Manager.my.INC)
    
    
    
    var async1 = t.beginAsync()
    
    use('JooseX/Namespace/Depended/static/dep/some_raw_dep.js', function() {
        
        t.ok(typeof some_raw_dep == 'boolean', 'Correctly loaded raw dependency')

        
        use('JooseX/Namespace/Depended/static/dep/some_raw_dep.js', function() {
            
            // repeated usage should not throw exception
            
            t.endAsync(async1)
            
            t.done()
        })
    })
})

