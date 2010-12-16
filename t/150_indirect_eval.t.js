StartTest(function(t) {
    
    use.paths.unshift('localLib/root2')
    
    if (!Joose.is_NodeJS) t.harness.absolutizeINC(use.paths)
    

    //==================================================================================================================================================================================
    t.diag("Dependencies in attribute specification")
    
    var async1 = t.beginAsync()
    
    use('BasicTest6.js', function () {
        
        t.skipIf(Joose.is_NodeJS, "Not supposed to work in NodeJS", function (){
            
            t.ok(typeof someGlobalVar == 'boolean', 'Global var has been established')
        }, 1)
        
        t.endAsync(async1)
        t.done()
    })
})