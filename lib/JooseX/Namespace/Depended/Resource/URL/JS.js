Class('JooseX.Namespace.Depended.Resource.URL.JS', {
    
    isa : JooseX.Namespace.Depended.Resource.URL,
    
    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Code ],
    
    
    after: {
        
        initialize: function () {
            var url = this.token
            
            debugger
            
            if (/^http/.test(url)) JooseX.Namespace.Depended.Transport.ScriptTag.meta.apply(this)
            
            debugger
            
        }
        
    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('jsurl', JooseX.Namespace.Depended.Resource.URL.JS)


//Joose.Meta.Class.meta.extend({
//    does                        : [ JooseX.Namespace.Depended ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ JooseX.Namespace.Depended ]
//})



//        processUse: function (dependenciesInfo) {
//            //we are scoping this method call not to usual "this", but to "this namespace"
//            //this is related to the fact, that during loading, the Module can be promoted to the Class, and the instance of meta 
//            //will change, but the class function itself will remain untouched
//            //this is also used in others places in the code
//            var thisNamespace = this.c
//            
//            thisNamespace.meta.prepareDependencies(dependenciesInfo)
//            thisNamespace.meta.processDependencies()
//            thisNamespace.meta.finalizeDependencies()
//        },
//        
//                
//        
//        prepareDependencies : function (dependenciesInfo){
//            if (!dependenciesInfo) return
//            
//            var thisNamespace = this.c
//            
//            dependenciesInfo = Joose.O.wantArray(dependenciesInfo)
//            
//            Joose.A.each(dependenciesInfo, function(descriptor) {
//                this.processDescriptor(this.prepareDependencyDescriptor(thisNamespace, descriptor))
//            }, this)
//        },
//        
//
//        processDescriptor : function(descriptor){
//            if (this.needDescriptor(descriptor)) this.addDescriptor(descriptor)
//        },
//        
//        
//        needDescriptor : function (descriptor) {
//            //if we already have this this dependency or if the Module in descriptor is ready  - we dont need it
//            return !( this.dependencies[descriptor.depName] || descriptor.Module.meta.ready )
//        },


//this function prepares the dependency descriptor (which can be a raw string also)
        //it turns the descritor.Module string to the "namespace body" with meta, which is Joose.Kernel.MetaClass
//        prepareDependencyDescriptor: function (thisNamespace, desc) {
//            var descriptor = {}
//            
//            //turning into object if necessary
//            if (typeof desc == 'string') 
//                descriptor.Module = desc
//            else if (typeof desc == 'object') {
//                
//                if (desc.url) 
//                    descriptor.url = desc.url
//                else if (desc.Module) {
//                    descriptor.Module = desc.Module
//                    
//                    if (desc.version) descriptor.version = desc.version
//                } else Joose.O.each(desc, function (version, Module) {
//                    descriptor.Module = Module
//                    descriptor.version = version
//                })
// 
//            }
//            
//            // ext:// to presence transformation, existing presence attribute will be overwritten!
//            if (/^ext:\/\//.test(descriptor.Module)) {
//                descriptor.Module = descriptor.Module.replace(/^ext:\/\//, '')
//                var moduleName = descriptor.Module
//                
//                descriptor.presence = function () {
//                    return eval(moduleName)
//                }
//            }
//            
//            var depName = descriptor.depName = descriptor.Module || descriptor.url
//
//            if (!depName) throw "Empty dependency name for Module=[" + thisNamespace + "]"
//            
//            //if there is no such dependency already
//            if (!thisNamespace.meta.dependencies[depName]) {
//                
//                //descriptor of Module dependency
//                if (descriptor.Module) {
//                    
//                    //non-Joose
//                    if (descriptor.presence) {
//                        descriptor.Module = Joose.Namespace.Manager.my.prepareVirtual(descriptor.Module)
//                        if (!descriptor.Module.meta.presence) descriptor.Module.meta.presence = descriptor.presence
//                    } else {
//                        //Joose
//                        
//                        //dependencies are always calculating from global namespace
//                        //turning string into Namespace instance, possible creating new namespace
//                        descriptor.Module = Joose.Namespace.Manager.my.create(descriptor.Module, Joose.Namespace.Keeper, null, Joose.Namespace.Manager.my.global)
//                    } 
//                    
//                } else {
//                    //descriptor of url dependency
//                    descriptor.Module = Joose.Namespace.Manager.my.prepareVirtual(descriptor.url)
//                    descriptor.Module.meta.url = descriptor.url
//                    JooseX.Namespace.Depended.Transport.ScriptTag.meta.apply(descriptor.Module.meta)
//                }
//            }
//            
//            return descriptor
//        },