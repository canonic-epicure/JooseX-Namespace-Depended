StartTest(function(t) {
	t.plan(17)
	
    //==================================================================================================================================================================================
    t.diag("Basic testing of dependencies loading");
    
    t.ok(JooseX.Namespace.Depended, 'JooseX.Namespace.Depended is here');
    t.ok(JooseX.Namespace.Depended.Transport.AjaxAsync, 'JooseX.Namespace.Depended.Transport.AjaxAsync is here');
    
    
    Module("Basic", {
        use : [ 'BasicTest1' ],
        body : function(){
            t.ok(BasicTest1.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #1-1');
            t.ok(new BasicTest1().result() == 1, "And it work as expected #1-2");
            
            t.ok(BasicTest2.meta.constructor == Joose.Meta.Class, 'Basic dependencies loading passed #2-1');
            t.ok(new BasicTest2().result() == 2, "And it work as expected #2-2");
        }
    });
    
    //==================================================================================================================================================================================
    t.diag("Dynamic (in-code) dependency loading");
    use('BasicTest3', function(){
        t.ok(BasicTest3.meta instanceof Joose.Meta.Class, 'Dynamic (in code context) basic dependencies loading passed');
        t.ok(new BasicTest3().result() == 3, 'Dynamic (in code context) basic dependencies loading passed #2');
    });
    
    
    //==================================================================================================================================================================================
    t.diag("Loading from external url");
    Module("GMapLoader", {
        use : {
            //google loader
            url : 'http://www.google.com/jsapi?key=ABQIAAAAa2oCDn-vJ2FYnkpuhajy_BQ8NCDMUx9yLS_m39ZE2Zv5G19HFRS1GJOvVuFnjwGNLUSMM6CiGDlA7g'
        },
        
        body : function(){
            t.ok(google && google.load, "Google loader was loaded correctly")
        }
    });
        
    
    //==================================================================================================================================================================================
    t.diag("Controllbale ready-ness of Module");
    
    var bodyCalled = false;
    
    Module("GMapEngine", {
        
        use : 'GMapLoader',
        
        BEGIN : function(ready){
            t.ok(!bodyCalled, 'BEGIN called before body');
            
            google.load('maps','2',{
                language : 'ru',
                callback : ready
            });
        },
        
        body : function() {
            bodyCalled = true;
            t.ok(google.maps && google.maps.Map2, "Google Maps engine was loaded correctly")
        }
    });
    
    //==================================================================================================================================================================================
    t.diag("List of searchable paths (@INC)");

    Module("Testy", {
        use : 'BasicTest4',
        
        body : function(){
            t.ok(BasicTest4 && BasicTest4.meta instanceof Joose.Meta.Class, "Class successfully loaded from secondary libroot");
            t.ok(new BasicTest4().result() == 4, "And it work as expected");
        }
    });
    
    
    //==================================================================================================================================================================================
    t.diag("Non-Joose dependency");
    
    __global__.nonJooseDoubleDeclared = false;
    
    
    Module("Testy3", {
        use : 'ext://BasicTest6',
        
        body : function(){
            t.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely");
            t.ok(BasicTest6, "Non-Joose dependency was succesfully loaded");
            t.ok(new BasicTest6().result() == 6, "And it work as expected");
            
            Module("Testy4", {
                use : 'ext://BasicTest6',
                
                body : function(){
                    t.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely #2");
                }
            });
        }
    });
});