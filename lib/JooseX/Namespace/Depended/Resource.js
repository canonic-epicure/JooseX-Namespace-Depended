Class('JooseX.Namespace.Depended.Resource', {
    
    have : {
        
        attachedTo          : null,
        
        name                : null,
        
//        idPrefix            : null,
        
        id                  : null,
        
        version             : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        readyListeners      : null,
        
        dependencies        : null,
        
        onBeforeReady       : null,
        readyDelegated      : false
    },
    
    
    after: {
        
        initialize: function () {
            this.dependencies = {}
            this.readyListeners = []
        }
        
    },

    
    
    methods: {
        
        addDescriptor : function (descriptor) {
            var resource = JooseX.Namespace.Depended.Manager.my.getResource(descriptor)
            
            if (this.dependencies[resource.id]) return
            
            var me = this
            //pushing listener to the end(!) of the list
            resource.readyListeners.push(function () {
                
                delete me.dependencies[resource.id]
                me.checkReady()
            })
            
            //adding dependency
            this.dependencies[resource.id] = resource
            
            //we are not ready, since there are depedencies to load                
            this.ready = false
        },
        
        
        processDependencies : function () {
            // || {} required for classes on which this Role was applied after they were created - they have this.dependencies not initialized
            Joose.O.eachSafe(this.dependencies || {}, function (resource) {
                resource.handleLoad()
            })
        },
        
        
        checkReady : function() {
            if (!Joose.O.isEmpty(this.dependencies)) return
            
            if (this.onBeforeReady) {
                
                if (!this.readyDelegated) {
                    this.readyDelegated = true
                    
                    var me = this
                    
                    this.onBeforeReady(function(){
                        me.fireReady()
                    })
                }
            } else 
                this.fireReady()
        },
        
        
        fireReady: function () {
            this.ready = true
            this.readyDelegated = false
            
            var listeners = this.readyListeners || []
            this.readyListeners = []
            
            Joose.A.each(listeners, function (listener) {
                listener()
            })
        },
        
        
        getUrls: function () {
            throw "Abstract resource method 'getUrls' was called"
        },
        
        
        isLoaded : function () {
            return this.loaded || this.ready
        },
        
        
        handleLoad: function() {
            
            if (this.isLoaded()) {
                this.checkReady()
                return
            }
            
            if (this.loading) return
            this.loading = true
            
            var urls = Joose.O.wantArray(this.getUrls())
            
            var me = this
            
            var onready = function() {
                me.loaded = true
                me.loading = false
                me.checkReady()
            }
            
            var onerror = function(){
                //if no more urls
                if (!urls.length) throw "Resource name=[" + me.id + "] type=[" + me + "] not found"
                
                me.load(urls.shift(), onready, onerror)
            }
            
            this.load(urls.shift(), onready, onerror)
        },
        

        load : function () {
            throw "Abstract resource method 'load' was called"
        }
        
    }
})


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
//            thisNamespace.meta.checkReady()
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