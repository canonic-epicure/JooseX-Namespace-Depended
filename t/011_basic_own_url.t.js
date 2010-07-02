StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.localizeURL(incPath, true)
    })
    
//    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(3)
    
    //==================================================================================================================================================================================
    t.diag("Success url of resource")
    
    var async1 = t.beginAsync()
    
    use('BasicTest3', function (ns) {
        t.diag("Dynamic (in-code) dependency loading")
        
        t.ok(BasicTest3.meta instanceof Joose.Meta.Class, 'Dynamic (in code context) basic dependencies loading passed')
        t.ok(new BasicTest3().result() == 3, 'Dynamic (in code context) basic dependencies loading passed #2')
        
        t.ok(BasicTest3.meta.resource.loadedFromURL.indexOf('/localLib/root1/BasicTest3.js') != -1, "Sucess url for 'BasicTest3' was assigned correctly")
        
        
        t.endAsync(async1)
    })

})