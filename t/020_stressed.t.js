StartTest(function(t) {
    
    var resolvedINC = []
    
    Joose.A.each(Joose.Namespace.Manager.my.INC, function (incPath) {
        resolvedINC.push( [ t.harness.resolveUrl(incPath.join('/'), true) ])
    })
    
    Joose.Namespace.Manager.my.INC = resolvedINC
    
    var profile = false
    
    t.plan(88)
    
	if (profile && console) console.profile()

    __global__.doubleDeclarations = false
    __global__.unSatisfiedDeps = false
    
    //==================================================================================================================================================================================
    t.diag("Stress testing of dependencies loading")
    
    var start      = new Date()
    var async      = t.beginAsync()
    
    Module("StressTest", {
        use : [ 'StressTest.Test001', 'StressTest.Test010' ],
        
        body : function() {
            var end   = new Date()
            
            t.diag("Duration = " + (end.getTime() - start.getTime()) / 1000)
            
            t.ok(!__global__.doubleDeclarations, "Stress testing passed without redeclarations")
            t.ok(!__global__.unSatisfiedDeps, "Stress testing passed with all dependencies satisfied")
            
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
