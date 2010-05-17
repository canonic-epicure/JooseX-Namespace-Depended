JooseX.Namespace.Depended.Resource.JooseClass.meta.extend({
    
    does : [ JooseX.Namespace.Depended.Transport.NodeJS, JooseX.Namespace.Depended.Materialize.NodeJS ]
})


JooseX.Namespace.Depended.Manager.my.disableCaching = false

JooseX.Namespace.Depended.Manager.my.containResources.unshift('require')



Joose.Namespace.Manager.meta.extend({
    
    override : {
        
        collectDependencies : function (from, to, extend, propName) {
            if (propName != 'require') return this.SUPERARG(arguments)
            
            Joose.A.each(Joose.O.wantArray(from), function (url) {
                to.push({
                    type    : 'require',
                    token   : url
                })
            })
            
            delete extend.require
        }
    }
})
