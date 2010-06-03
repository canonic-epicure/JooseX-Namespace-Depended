StartTest(function(t) {
    
    JooseX.Namespace.Depended.Manager.my.INC = [ 'localLib/root1', 'localLib/root2' ]
    
    Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (incPath, indx) {
        JooseX.Namespace.Depended.Manager.my.INC[indx] = t.harness.resolveUrl(incPath, true)
    })
    
    JooseX.Namespace.Depended.Manager.my.disableCaching = false
    
    t.plan(9)
    
    //==================================================================================================================================================================================
    //t.diag("Dependency from already loaded external code")
    
    BasicTest6 = {
        res : 'external'
    }
    
    var isSync1 = false
    
    Module("Testy3", {
        use : 'nonjoose://BasicTest6',
        
        body : function(){
            t.ok(BasicTest6.res == 'external', "BasicTest6 was not modified")
            
            isSync1 = true
            
            //==================================================================================================================================================================================
            t.diag("Dependency from already loaded external code")
            
            var res = JooseX.Namespace.Depended.Manager.my.getResource('nonjoose://BasicTest6')
            t.ok(res.isLoaded(), 'BasicTest6 is considered loaded')
            t.ok(res.isReady(), 'BasicTest6 is considered ready')
            
            t.ok(res.presence() == BasicTest6, 'Default presence attribute works correctly')
            
            Module("Testy4", {
                use : 'nonjoose://BasicTest6',
                
                body : function(){
                    t.ok(BasicTest6.res == 'external', "BasicTest6 was not modified #2")
                }
            })
        }
    })
    
    t.ok(isSync1, 'Deps are handled synchronously')
    
    
    //==================================================================================================================================================================================
    //t.diag("Custom presence attribute")
    
    var isSync2 = false
    
    Module("Testy5", {
        use : { 
            type : 'nonjoose',
            token : 'Custom',
            presence : function () {
                return true
            } 
        },
        
        body : function(){
            t.ok(typeof Custom == 'undefined', "'nonjoose://Custom' is not actually exists")
            
            isSync2 = true

            //==================================================================================================================================================================================
            t.diag("Custom presence attribute")
            
            var async3 = t.beginAsync()
            
            Module("Testy6", {
                use : 'nonjoose://Custom',
                
                body : function(){
                    t.ok(typeof Custom == 'undefined', "'nonjoose://Custom' is not actually exists #2")
                    
                    t.endAsync(async3)
                }
            })
        }
    })
    
    t.ok(isSync2, 'Deps are handled synchronously #2')
    
})