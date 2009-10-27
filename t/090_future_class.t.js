StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2', '/inc' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    
    t.plan(3)
    
    var async1 = t.beginAsync()
    
    
    //==================================================================================================================================================================================
    //t.diag("Using Joose.FutureClass for attributes declaration")
    
    Class('TestClass', {
        
        use : 'Chain1',
        
        has : {
            
            metaClass : Joose.FutureClass('Chain1')
        },
        
        
        body : function () {
            //==================================================================================================================================================================================            
            t.diag("Using Joose.FutureClass for attributes declaration")
            
            t.ok(TestClass, 'TestClass was created')
            t.ok(Chain1, 'Chain1 was created')
            
            var test = new TestClass()
            
            t.ok(test.metaClass == Chain1, "Attribute 'metaclass' was initialized correctly")
            
            t.endAsync(async1)
        }
    })
    
})