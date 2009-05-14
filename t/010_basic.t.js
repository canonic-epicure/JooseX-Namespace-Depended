StartTest(function(t) {
	
    var resolvedINC = []
    
    Joose.A.each(Joose.Namespace.Manager.my.INC, function (incPath) {
        resolvedINC.push( [ t.harness.resolveUrl(incPath.join('/'), true) ])
    })
    
    Joose.Namespace.Manager.my.INC = resolvedINC
    
    t.plan(18)
	
    //==================================================================================================================================================================================
    t.diag("Basic testing of dependencies loading")
    
    t.ok(JooseX.Namespace.Depended, 'JooseX.Namespace.Depended is here')
    t.ok(JooseX.Namespace.Depended.Transport.AjaxAsync, 'JooseX.Namespace.Depended.Transport.AjaxAsync is here')
    
    var async1 = t.beginAsync()
    
    Module("Basic", {
        use : [ 'BasicTest1' ],
        body : function(){
            t.ok(BasicTest1.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #1-1')
            t.ok(new BasicTest1().result() == 1, "And it work as expected #1-2")
            
            t.ok(BasicTest2.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #2-1')
            t.ok(new BasicTest2().result() == 2, "And it work as expected #2-2")
            
            t.endAsync(async1)
        }
    })
    
    //==================================================================================================================================================================================
    //t.diag("Dynamic (in-code) dependency loading")
    
    var async2 = t.beginAsync()
    
    use('BasicTest3', function(){
        t.diag("Dynamic (in-code) dependency loading")
        
        t.ok(BasicTest3.meta instanceof Joose.Meta.Class, 'Dynamic (in code context) basic dependencies loading passed')
        t.ok(new BasicTest3().result() == 3, 'Dynamic (in code context) basic dependencies loading passed #2')
        
        t.endAsync(async2)
    })
    
    
    //==================================================================================================================================================================================
    //t.diag("Loading from external url")
    
    var async3 = t.beginAsync()
    
    Module("GMapLoader", {
        use : {
            //google loader
            url : 'http://www.google.com/jsapi?key=ABQIAAAAa2oCDn-vJ2FYnkpuhajy_BQ8NCDMUx9yLS_m39ZE2Zv5G19HFRS1GJOvVuFnjwGNLUSMM6CiGDlA7g'
        },
        
        body : function(){
            t.diag("Loading from external url")
            
            t.ok(google && google.load, "Google loader was loaded correctly")
            
            t.endAsync(async3)
        }
    })
        
    
    //==================================================================================================================================================================================
    //t.diag("Controllbale ready-ness of Module")
    
    var async4 = t.beginAsync()
    var bodyCalled = false
    
    Module("GMapEngine", {
        
        use : 'GMapLoader',
        
        BEGIN : function(ready){
            t.diag("Controllbale ready-ness of Module")
            
            t.ok(!bodyCalled, 'BEGIN called before body')
            
            google.load('maps', '2', {
                language : 'ru',
                callback : ready
            })
        },
        
        body : function() {
            bodyCalled = true
            t.ok(google.maps && google.maps.Map2, "Google Maps engine was loaded correctly")
            
            t.endAsync(async4)
        }
    })
    
    //==================================================================================================================================================================================
    //t.diag("List of searchable paths (@INC)")
    
    var async5 = t.beginAsync()

    Module("Testy", {
        use : 'BasicTest4',
        
        body : function(){
            t.diag("List of searchable paths (@INC)")
            
            t.ok(BasicTest4 && BasicTest4.meta instanceof Joose.Meta.Class, "Class successfully loaded from secondary libroot")
            t.ok(new BasicTest4().result() == 4, "And it work as expected")
            
            t.endAsync(async5)
        }
    })
    
    
    //==================================================================================================================================================================================
    //t.diag("Non-Joose dependency")
    
    var async6 = t.beginAsync()
    __global__.nonJooseDoubleDeclared = false
    
    
    Module("Testy3", {
        use : 'ext://BasicTest6',
        
        body : function(){
            t.diag("Non-Joose dependency")
            
            t.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely")
            t.ok(BasicTest6, "Non-Joose dependency was succesfully loaded")
            t.ok(new BasicTest6().result() == 6, "And it work as expected")
            
            Module("Testy4", {
                use : 'ext://BasicTest6',
                
                body : function(){
                    t.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely #2")
                    
                    t.endAsync(async6)
                }
            })
        }
    })
    
    //==================================================================================================================================================================================
    //t.diag("Dependency from empty class")
    
    var async7 = t.beginAsync()

    Module("Testy4", {
        use : 'BasicTest5',
        
        body : function(){
            t.diag("Dependency from empty class")
            
            t.ok(BasicTest5 && BasicTest5.meta instanceof Joose.Meta.Class, "Empty class successfully loaded")
            
            t.endAsync(async7)
        }
    })
    
})