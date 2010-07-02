StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.localizeURL(incPath, true)
    })
    
//    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(3)
    
    //==================================================================================================================================================================================
    t.diag("Asynchronous Module nesting")
    
    var async1 = t.beginAsync()
    var async2 = t.beginAsync()
    var async3 = t.beginAsync()
    
    Module('TestModule', {
        
        use : 'BasicTest1', 
        
        body : function () {
            
            Class('Test1', {
                use : 'StressTest.Test080',
                
                body : function () {
                    t.ok(TestModule.Test1, "Something in the 'TestModule.Test1' spot")
                    
                    t.endAsync(async1)
                }
            })
            

            Class('Test2', {
                use : 'StressTest.Test090',
                
                body : function () {
                    t.ok(TestModule.Test2, "Something in the 'TestModule.Test2' spot")
                    
                    t.endAsync(async2)
                }
            })
            
            
            Class('Test3', {
                use : 'StressTest.Test095',
                
                body : function () {
                    t.ok(TestModule.Test3, "Something in the 'TestModule.Test3' spot")
                    
                    t.endAsync(async3)
                }
            })
        }
    
    })
    
})