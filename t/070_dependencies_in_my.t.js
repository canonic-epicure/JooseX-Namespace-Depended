StartTest(function(t) {
	
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
//    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(1)
	
    //==================================================================================================================================================================================
    t.diag("Asynchronous Module nesting")
    
    var async1 = t.beginAsync()
    
    Class('TestClass', {
        
        my : {
            does : 'BasicRole1',
            
            body : function () {
                
                t.ok(TestClass.my.res1 == 'res1', "Attribute 'res1' was correctly composed into 'my' instance")
                
                TestClass.my.process1()
                t.ok(TestClass.my.res1 == 'processed1', ".. the same about the 'process1' method")
                
                t.endAsync(async1)
            }
        }
    
    })
    
})