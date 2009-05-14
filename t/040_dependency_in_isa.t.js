StartTest(function(t) {
	
    var resolvedINC = []
    
    Joose.A.each(Joose.Namespace.Manager.my.INC, function (incPath) {
        resolvedINC.push( [ t.harness.resolveUrl(incPath.join('/'), true) ])
    })
    
    Joose.Namespace.Manager.my.INC = resolvedINC
    
    t.plan(4)
	
    //==================================================================================================================================================================================
    t.diag("Dependency in 'isa' builder")
    
    t.ok(JooseX.Namespace.Depended, 'JooseX.Namespace.Depended is here')
    t.ok(JooseX.Namespace.Depended.Transport.AjaxAsync, 'JooseX.Namespace.Depended.Transport.AjaxAsync is here')
    
    var async1 = t.beginAsync()
    
    Class("Basic", {
        isa : 'BasicTest7',
        
        body : function(){
            t.ok(Basic.meta.constructor == Joose.Meta.Class, 'Class Basic was created')
            t.ok(new Basic().result() == 7, "And it has inherited 'result' method")
            
            t.endAsync(async1)
        }
    })

    
})