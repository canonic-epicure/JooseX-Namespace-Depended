StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })

    
    t.plan(5)
    
    //==================================================================================================================================================================================
    //t.diag("Dependency in 'meta'")
    
    var async0 = t.beginAsync()
    
    Class('TestClass', {
        
        meta : 'BasicMetaClass',
        
        isa : 'BasicTest2',
        
        sugar : '',
        
        body : function (Basic0) {
            t.diag("Dependency in 'meta'")
            
            t.ok(BasicMetaClass, 'BasicMetaClass was loaded')
            t.ok(BasicTest2, 'BasicTest2 was loaded')
            
            t.ok(TestClass.meta.constructor == BasicMetaClass, 'Correct metaclass was used for TestClass')
            
            t.ok(TestClass.meta.hasAttribute('sugar'), "'TestClass' has 'sugar' attribute, received via builder from metaclass")
            t.ok(new TestClass().sugar == 'sweet', "'sugar' attribute has correct initial value")
            
            t.endAsync(async0)
        }
    })
    
})