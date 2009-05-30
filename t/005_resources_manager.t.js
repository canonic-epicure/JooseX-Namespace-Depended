StartTest(function(t) {
	
    t.plan(1)
	
    //==================================================================================================================================================================================
    t.diag("Resources manager")
    
    t.ok(JooseX.Namespace.Depended.Manager, 'JooseX.Namespace.Depended.Manager is here')
    
    
    var res1 = JooseX.Namespace.Depended.Manager.my.getResource('TestClass')
    var res1 = JooseX.Namespace.Depended.Manager.my.getResource('js://TestClass')
    
    var res2 = JooseX.Namespace.Depended.Manager.my.getResource({ 'TestClass' : 0.01 })
    var res1 = JooseX.Namespace.Depended.Manager.my.getResource('js://TestClass#0.01')
    
    var res3 = JooseX.Namespace.Depended.Manager.my.getResource({ 
        type : '',
        name : 'extjs://TestClass' 
    })
    
    var res4 = JooseX.Namespace.Depended.Manager.my.getResource({ 
        type : 'url',
        name : 'urljs://http://google.com/gmap/yo.js' 
    })
    
    var res5 = JooseX.Namespace.Depended.Manager.my.getResource({ 
        type : 'css',
        name : 'css:///inc/Test/Run/static/css/all.css' 
    })
    
    var res6 = JooseX.Namespace.Depended.Manager.my.getResource({ 
        type : 'img',
        name : 'img:///inc/Test/Run/static/img/ok.jpg' 
    })
})