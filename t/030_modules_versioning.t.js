StartTest(function(t) {
    t.plan(6)
    
    //==================================================================================================================================================================================
    t.diag("Versioning")
    
    var async      = t.beginAsync()
    
    Module("StressTest.Versioning", {
        use : { Module : 'StressTest.Test035', version : 0.05 },
        
        body : function () {
            
            t.ok(StressTest.Versioning, "Something in the Versioning module spot")
            
            t.ok(StressTest.Test035, "StressTest.Test035 module created")
            t.ok(StressTest.Test035.meta.constructor == Joose.Meta.Class, "StressTest.Test035 class created")
            t.ok(StressTest.Test035.meta.hasMethod('result'), "StressTest.Test035 has method 'result'")
            t.ok(new (StressTest.Test035)().result() == 35, "StressTest.Test035 can be instantiated")
            
            t.ok(true, "StressTest.Test035 has higher version than required")
            
            //TODO Global exceptions intercepting
            //t.throws_ok(function(){
//                Module("Level1_1", {
//                    use : { Module : 'StressTest.Test050', version : 1.01 },
//                    
//                    body : function () {
//                        Class("Level2_1", {
//                            methods : {
//                                three : function () { return 3 }
//                            },
//                            body : function (){
//                                t.ok(new StressTest.Nested.Level1_1.Level2_1().three() == 3, "StressTest.Nested.Level1_1.Level2_1 works correctly #1")
//                            }
//                        })
//                        t.ok(StressTest.Nested.Level1_1.Level2_1, "Something in the nested module spot, at level 2, #1")
//                    }
//                })
            //TODO Global exceptions intercepting
            //}, 'Loaded dependency StressTest.Test050 has lower version [0.1] than required [1.01]', 'StressTest.Test050 has lower version than required')
//            t.ok(!StressTest.Versioning.Level1_1.meta.meta.isa(Joose.Class), "There is no class in the StressTest.Versioning.Level1_1 module spot")

            t.endAsync(async)
        }
    })
})
