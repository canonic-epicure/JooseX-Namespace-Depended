Role('JooseX.Namespace.Depended.Materialize.Code', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob) {
            eval(resourceBlob)
        }
        
    }

})