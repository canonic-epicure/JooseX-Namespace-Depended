////XXX several failures in FF(?)
//
//Role('JooseX.Namespace.Depended.Materialize.Script', {
//    
//    requires : [ 'handleLoad' ],
//    
//    methods : {
//        
//        materialize : function (resourceBlob) {
//            var loaderNode = document.createElement("script")
//            
////            loaderNode.onload = loaderNode.onreadystatechange = function () {
////                if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200)
////                    //surely for IE6..
////                    setTimeout(ready, 1)
////            }
//            
//            loaderNode.text = resourceBlob
////            document.getElementsByTagName("head")[0].appendChild(loaderNode)
//            
//            //adding to body, because Safari do not create HEAD for iframe's documents
//            document.body.appendChild(loaderNode)
//        }
//        
//    }
//
//})