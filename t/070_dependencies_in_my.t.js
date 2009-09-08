StartTest(function(t) {
	
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
//    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(5)
	
    //==================================================================================================================================================================================
    //t.diag("Specifiying dependency in 'my' singleton")
    
    var async1 = t.beginAsync()
    
    Class('TestClass', {
        
        my : {
            does : 'BasicRole1',
            
            body : function () {
                //==================================================================================================================================================================================
                t.diag("Specifiying dependency in 'my' singleton")
                
                t.ok(TestClass.my.res1 == 'res1', "Attribute 'res1' was correctly composed into 'my' instance")
                
                TestClass.my.process1()
                t.ok(TestClass.my.res1 == 'processed1', ".. the same about the 'process1' method")
                
                t.endAsync(async1)
            }
        }
    
    })
    
    
    //==================================================================================================================================================================================
    //t.diag("Dependency from class, which have depended 'my' singleton")
    
    var async2 = t.beginAsync()
    
    use('WithDependedMy', function () {
        t.diag("Dependency from class, which have depended 'my' singleton")
        
        t.ok(typeof Chain1 == 'function', "Dependency of 'WithDependedMy' was loaded")
        
        t.ok(WithDependedMy, "WithDependedMy was created")
        t.ok(WithDependedMy.my, ".. and it has a singleton")
        
        
        t.endAsync(async2)
    })
    
})