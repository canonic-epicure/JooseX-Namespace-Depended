StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(15)
    
    //==================================================================================================================================================================================
    t.diag("Dependency from already loaded external code")
    
    BasicTest6 = {
        res : 'external'
    }
    
    
    Module("Testy3", {
        use : 'ext://BasicTest6',
        
        body : function(){
            t.ok(BasicTest6.res == 'external', "BasicTest6 was not modified")
            
            Module("Testy4", {
                use : 'ext://BasicTest6',
                
                body : function(){
                    t.ok(BasicTest6.res == 'external', "BasicTest6 was not modified #2")
                }
            })
        }
    })
    
    t.ok(Testy3, 'Testy3 module was created')
    t.ok(Testy3.meta.resource.loaded, 'Testy3 module is considered loaded')
    t.ok(!Testy3.meta.resource.loading, 'Testy3 module is considered not loading')
    t.ok(Testy3.meta.resource.ready, 'Testy3 module is ready - there were no actual loading')
    
    var res = JooseX.Namespace.Depended.Manager.my.getResource('ext://BasicTest6')
    t.ok(res.isLoaded(), 'BasicTest6 is considered loaded')
    t.ok(res.ready, 'BasicTest6 is considered ready')
    
    t.ok(res.presence() == BasicTest6, 'Default presence attribute works correctly')

    
    //==================================================================================================================================================================================
    t.diag("Custom presence attribute")
    
    Module("Testy5", {
        use : { 
            type : 'ext',
            token : 'Custom',
            presence : function () {
                return true
            } 
        },
        
        body : function(){
            t.ok(typeof Custom == 'undefined', "'ext://Custom' is not actually exists")
            
            Module("Testy6", {
                use : 'ext://Custom',
                
                body : function(){
                    t.ok(typeof Custom == 'undefined', "'ext://Custom' is not actually exists #2")
                }
            })
        }
    })
    
    t.ok(Testy5, 'Testy5 module was created')
    t.ok(Testy5.meta.resource.loaded, 'Testy5 module is considered loaded')
    t.ok(!Testy5.meta.resource.loading, 'Testy5 module is considered not loading')
    t.ok(Testy5.meta.resource.ready, 'Testy5 module is ready - there were no actual loading')
    
})