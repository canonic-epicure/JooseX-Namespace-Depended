StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })

    
    t.plan(7)
    
    //==================================================================================================================================================================================
    t.diag("Synchronous creation of anonymous classes without dependencies")

    
    var testClass = Class({
        
        has : {
            attr : 'value'
        },
        
        methods : {
            result : function () {
                return 'result'
            }
        }
    })
    
    t.ok(testClass, 'Something was returned as constructor, synchronously')
    t.ok(testClass.meta instanceof Joose.Meta.Class, 'And its an anonymous class')
    
    
    var obj = new testClass()
    
    t.ok(obj.attr == 'value', 'Attribute is correct')
    t.ok(obj.result() == 'result', '.. and method also')
    

    //==================================================================================================================================================================================
    t.diag("Creation of anonymous classes with dependencies (via 'use')")
    
    
    var async1 = t.beginAsync()
    
    use('BasicTest1', function () {
    
        t.ok(BasicTest1, 'BasicTest1 was loaded')
        t.ok(BasicTest2, 'BasicTest2 was loaded')
        
        
        use('BasicTest1', function () {
            
            t.pass('Dependency from already loaded classes works')
            
            t.endAsync(async1)
        })
    })
    
    
})