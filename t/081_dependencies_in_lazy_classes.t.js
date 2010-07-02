StartTest(function(t) {

    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2', '/inc' ]
    
    if (!Joose.is_NodeJS) t.harness.localizeINC(JooseX.Namespace.Depended.Manager.my.INC)
    
    
    t.plan(1)

    
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
    
})