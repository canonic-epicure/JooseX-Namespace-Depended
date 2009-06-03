StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    var profile = false
    
    t.plan(87)
    
	if (profile && console) console.profile()

    //==================================================================================================================================================================================
    t.diag("Stress testing of dependencies loading")
    
    var start      = new Date()
    var async      = t.beginAsync()
    
    Module("StressTest", {
        use : [ 'StressTest.Test001', 'StressTest.Test010' ],
        
        body : function() {
            var end   = new Date()
            
            t.diag("Duration = " + (end.getTime() - start.getTime()) / 1000)
            
            for (var i = 1; i <= 100; i++) {
                var class_name = new String(i).split('')
                while (class_name.length < 3) class_name.unshift('0')
                
                class_name = 'Test' + class_name.join('')
                
                var testClass = StressTest[class_name]
                
                if (typeof testClass == 'function')
                    t.ok(
                        testClass.meta.constructor == Joose.Meta.Class && testClass.meta.hasMethod('result') && new testClass().result() == i,
                        "Class 'StressTest." + class_name + "' was loaded correctly"
                    )
            }
            
            t.endAsync(async)
            
            if (profile && console) console.profileEnd()
        }
    })
    
    t.ok(StressTest, "Root module created")
})
