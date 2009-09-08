StartTest(function(t) {
	
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2', '/inc' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    
    t.plan(18)
    
    var async1 = t.beginAsync()
    
    //==================================================================================================================================================================================
    //t.diag("Dependency from lazy class")
    
    use('Lazy1', function () {
        t.diag("Dependency from lazy class")
        
        t.ok(typeof Lazy1 == 'function', "Class 'Lazy1' was loaded")
        
        t.ok(Lazy1.meta.pending, "Class 'Lazy1' is pending for construction")
        t.ok(!Lazy1.prototype.result, '.. indeed')
        
        Lazy1.getMeta()
        
        t.ok(!Lazy1.meta.pending, "Class 'Lazy1' was constructed")
        t.ok(Lazy1.prototype.result, '.. indeed')
        
        t.endAsync(async1)
    })
    
    
    //==================================================================================================================================================================================
    //t.diag("Dependency of lazy class")
    

    use('Lazy2', function () {
        
        //==================================================================================================================================================================================
        t.diag("Class were loaded but not constructed")
        
        t.ok(typeof Lazy2 == 'function', "Class 'Lazy2' was loaded")
        
        t.ok(Lazy2.meta.pending, "Class 'Lazy2' is pending for construction")
        t.ok(!Lazy2.prototype.result, '.. indeed')
        
        
        //==================================================================================================================================================================================
        t.diag("Dependencies of lazy class")
        
        t.ok(typeof Chain1.Middle.Chain2 == 'function', "Dependencies of 'Lazy2' were loaded")
        t.ok(new Chain1.Middle.Chain2().result() == 2, "... and works correctly")
        
        
        //WithDependedMy2.my checkin
        var my = WithDependedMy2.my
        
        t.ok(my, "Class 'WithDependedMy2' has singleton")
        t.ok(my.result() == 'withDependedMy2', "And it has native 'result' method")
        
        t.ok(typeof Chain1 == 'function', "'Chain1' was created")
        
        
        t.ok(my.sugar == 'sweet', "'WithDependedMy2.my' has a correct 'sugared' attribute via additional builder")
        
        
        t.ok(my.res3 == 'res3', "And it has composed 'res3' attribute")
        
        my.process3()
        
        t.ok(my.res3 == 'processed3', "And it has composed 'process3' method")
        
        
        var lazy = new Lazy2()
        
        t.ok(!Lazy2.meta.pending, "Class 'Lazy2' was constructed")
        t.ok(Lazy2.prototype.result, '.. indeed')
        
        t.endAsync(async1)
    })
    
})