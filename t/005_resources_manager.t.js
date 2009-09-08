StartTest(function(t) {
	
    t.plan(21)
	
    //==================================================================================================================================================================================
    t.diag("Sanity")
    
    t.ok(JooseX.Namespace.Depended.Manager, 'JooseX.Namespace.Depended.Manager is here')
    
    t.ok(JooseX.Namespace.Depended.Resource, 'JooseX.Namespace.Depended.Resource is here')
    t.ok(JooseX.Namespace.Depended.Resource.JS, 'JooseX.Namespace.Depended.Resource.JS is here')
    t.ok(JooseX.Namespace.Depended.Resource.URL, 'JooseX.Namespace.Depended.Resource.URL is here')
    t.ok(JooseX.Namespace.Depended.Resource.URL.JS, 'JooseX.Namespace.Depended.Resource.URL.JS is here')
    t.ok(JooseX.Namespace.Depended.Resource.JS.External, 'JooseX.Namespace.Depended.Resource.JS.External is here')
    
    t.ok(JooseX.Namespace.Depended.Transport.AjaxAsync, 'JooseX.Namespace.Depended.Transport.AjaxAsync is here')
    t.ok(JooseX.Namespace.Depended.Transport.ScriptTag, 'JooseX.Namespace.Depended.Transport.ScriptTag is here')
    
    t.ok(JooseX.Namespace.Depended.Materialize.Code, 'JooseX.Namespace.Depended.Materialize.Code is here')
    
    t.ok(JooseX.Namespace.Depended, 'JooseX.Namespace.Depended is here')
    
    
    t.ok(Joose.Meta.Class.meta.does(JooseX.Namespace.Depended), 'Joose.Meta.Class does JooseX.Namespace.Depended')
    t.ok(Joose.Meta.Role.meta.does(JooseX.Namespace.Depended), 'Joose.Meta.Role does JooseX.Namespace.Depended')
    
    
    //==================================================================================================================================================================================
    t.diag("Resource's pool")
    
    var testClassRes1 = JooseX.Namespace.Depended.Manager.my.getResource('TestClass')
    var testClassRes2 = JooseX.Namespace.Depended.Manager.my.getResource('js://TestClass')
    
    t.ok(testClassRes1 === testClassRes2, "Default resource type is 'js', resources pool works")

    
    //==================================================================================================================================================================================
    t.diag("JS resources with versions")
    
    testClassRes1.addDescriptor({ 
        'Test1' : 0.01, 
        'Test2' : 0.02
    })
    
    var testRes1 = testClassRes1.dependencies['js://Test1']
    t.ok(testRes1, 'Resource for Test1 was created')
    t.ok(testRes1.requiredVersion == 0.01, '.. and it has correct version')
    t.ok(testRes1.id == 'js://Test1', '.. and it has correct id')
    t.ok(testRes1.type == 'js', '.. and it has correct type')
    
    var testRes2 = testClassRes2.dependencies['js://Test2']
    t.ok(testRes2, 'Resource for Test2 was created')
    t.ok(testRes2.requiredVersion == 0.02, '.. and it has correct version')
    t.ok(testRes2.id == 'js://Test2', '.. and it has correct id')
    t.ok(testRes2.type == 'js', '.. and it has correct type')
    
//    var res2 = JooseX.Namespace.Depended.Manager.my.getResource({ 'TestClass' : 0.01 })
//    var res1 = JooseX.Namespace.Depended.Manager.my.getResource('js://TestClass#0.01')
//    
//    var res3 = JooseX.Namespace.Depended.Manager.my.getResource({ 
//        type : 'ext',
//        token : 'TestClass.Yo.Yo',
//        presence : function () { return TestClass.Yo.Yo},    
//    })
//    
//    var res4 = JooseX.Namespace.Depended.Manager.my.getResource({ 
//        type : 'url',
//        name : 'urljs://http://google.com/gmap/yo.js' 
//    })
//    
//    var res5 = JooseX.Namespace.Depended.Manager.my.getResource({ 
//        type : 'css',
//        name : 'css:///inc/Test/Run/static/css/all.css' 
//    })
//    
//    var res6 = JooseX.Namespace.Depended.Manager.my.getResource({ 
//        type : 'img',
//        name : 'img:///inc/Test/Run/static/img/ok.jpg' 
//    })
})