StartTest(function(t) {

    JooseX.Namespace.Depended.Manager.my.INC.unshift('localLib/root1', 'localLib/root2', '/inc')
    
    if (!Joose.is_NodeJS) t.harness.absolutizeINC(JooseX.Namespace.Depended.Manager.my.INC)
    
    
    t.plan(1)

    
    t.skipIf(Joose.is_NodeJS, "Won't test lazy classes for now", function () {
    
        var async1 = t.beginAsync()
    
        
        use([ 'Ensovis.Adapter' ], function () {
            
            //===========================================================================================================================================================================================================
            //t.diag('RemoteClass creation')
            
            Class('Simple', {
                
                use : 'Ensovis.Adapter.RemoteMethod.Add',
                
                body : function () {
                    //===========================================================================================================================================================================================================
                    t.diag('Additional dependencies')
                    
                    t.ok(Ensovis.Adapter.RemoteMethod.Add, 'Ensovis.Adapter.RemoteMethod.Add is here')
                    
                    t.endAsync(async1)
                }
            })
        })
    
    }, 1)
})