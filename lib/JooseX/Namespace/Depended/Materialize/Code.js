Role('JooseX.Namespace.Depended.Materialize.Code', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob) {
            arguments.callee.__JOOSE_MODULE__ = Joose.Namespace.Manager.my.global
            eval(resourceBlob)
        }
        
    }

})