StartTest(function(t) {

    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2', '/inc' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    
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