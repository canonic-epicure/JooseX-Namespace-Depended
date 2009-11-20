StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })

    
    t.plan(4)
    
    //==================================================================================================================================================================================
    t.diag("Creation synchronous classes without dependencies")

    
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
    
})