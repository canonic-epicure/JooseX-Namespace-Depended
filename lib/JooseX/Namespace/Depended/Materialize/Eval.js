Role('JooseX.Namespace.Depended.Materialize.Eval', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob/*, cont, scope*/) {
            
//            debugger
            eval.call(Joose.top, resourceBlob)
            
//            debugger
            
//            cont.call(scope)
        }
        
    }

})