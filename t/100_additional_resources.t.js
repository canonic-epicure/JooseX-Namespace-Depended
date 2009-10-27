StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2', '/inc' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    
    t.plan(7)
    

    //==================================================================================================================================================================================
    t.diag("Meta class with additional resources specificator")
    
    Class('Meta', {
        isa : Joose.Meta.Class,
        meta : Joose.Meta.Class,
        
        methods : {
            alsoDependsFrom : function (extend) {
                var res = this.collectDependenciesFrom(extend.additional, extend.also)
                
                delete extend.additional
                delete extend.also
                
                return res
            }
        }
        
    
    })
    
    t.ok(Meta, 'Meta was created')
    
    
    var async1 = t.beginAsync()
    
    
    //==================================================================================================================================================================================
    //t.diag("Gathering resources from non-standard builders")
    
    Class('TestClass', {
        
        meta : Meta,
        
        also : {
            'Chain1' : 0.1
        },
        
        additional : [ 'BasicTest1' ],
        
        
        body : function () {
            //==================================================================================================================================================================================            
            t.diag("Gathering resources from non-standard builders")
            
            t.ok(TestClass, 'TestClass was created')
            t.ok(Chain1, 'Chain1 was loaded')
            t.ok(BasicTest1, 'BasicTest1 was loaded')
            t.ok(BasicTest2, 'BasicTest2 was loaded also')
            
            t.ok(new BasicTest1().result() == 1, 'BasicTest1 works correctly')
            t.ok(new BasicTest2().result() == 2, 'BasicTest2 works correctly')
            
            t.endAsync(async1)
        }
    })
    
})