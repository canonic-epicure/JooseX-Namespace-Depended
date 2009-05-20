Role('JooseX.Namespace.Depended', {
    
    requires : [ 'copyNamespaceState' ],
    
    have : {
        version             : null,
        
        url                 : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        readyListeners      : null,
        
        BEGIN               : null,
        
        //object with dependency descriptors
        dependencies        : null
    },
    
    
    before: {
        
        initialize: function () {
            this.dependencies = {}
            this.readyListeners = []
        }
        
    },
        
    after: {
        
        copyNamespaceState : function (targetClass) {
        	var targetMeta = targetClass.meta
        	
            targetMeta.version              = this.version
            targetMeta.loading              = this.loading
            targetMeta.loaded               = this.loaded
            targetMeta.ready                = this.ready
            targetMeta.readyListeners       = this.readyListeners
            targetMeta.dependencies         = this.dependencies
            targetMeta.BEGIN                = this.BEGIN
        }
        
    },
    
    
    override: {
        
        construct: function (extend) {
            extend = extend || {}
            
            //XXX can't depend from preloaded empty classes - they are always not ready, smthing should be done with this hack
            if (Joose.O.isEmpty(extend)) return
            
            //if we are initializing from extend, then we consider that we are loaded
            this.loaded = true
            this.loading = false
            
            if (typeof extend.isa == 'object' || typeof extend.isa == 'string') {
                extend.use = Joose.O.wantArray(extend.use || [])
                extend.use.unshift(extend.isa)
                
                extend.resolveIsa = extend.isa
                delete extend.isa
            }
            
            if (extend.use) {
	            this.setBEGIN(extend.BEGIN)
	            delete extend.BEGIN
            
                var thisNamespace = this.c
                
                //unshift is critical for correct order of readyListerens processing
                //initialization delaying until module will become ready 
                this.readyListeners.unshift(function () {
                    thisNamespace.meta.construct(extend)
                })
                
                var depInfo = extend.use
                delete extend.use
                
                this.processUse(depInfo)
            } else {
                if (extend.resolveIsa) {
                    var isaStr = extend.resolveIsa
                    if (typeof isaStr == 'object') Joose.O.each(isaStr, function (version, name) { isaStr = name })
                    
                    extend.isa = eval(isaStr)
                    
                    delete extend.resolveIsa
                }
                
                this.SUPER(extend)
                
                this.processUse()
            }
        }
    },
    
    
    builder : {
    	
    	override : {
	        
	        version: function (targetClassMeta, version) {
	            targetClassMeta.version = version
	        }
            
    	}
    },
    
    methods: {
        
        //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
        //this allows to manually control the "ready-ness" of module (custom pre-processing)
        //BEGIN receives the function (callback), which should be called at the end of custom processing 
        setBEGIN: function (begin) {
            if (begin) {
                if (this.BEGIN) throw "Double declaration of BEGIN property for module=[" + this.c + "]"
                
                this.BEGIN = begin
            }
        },
        
        
        processUse: function (dependenciesInfo) {
            //we are scoping this method call not to usual "this", but to "this namespace"
            //this is related to the fact, that during loading, the Module can be promoted to the Class, and the instance of meta 
            //will change, but the class function itself will remain untouched
            //this is also used in others places in the code
            var thisNamespace = this.c
            
            thisNamespace.meta.prepareDependencies(dependenciesInfo)
            thisNamespace.meta.processDependencies()
            thisNamespace.meta.finalizeDependencies()
        },
        
                
        //this function prepares the dependency descriptor (which can be a raw string also)
        //it turns the descritor.Module string to the "namespace body" with meta, which is Joose.Kernel.MetaClass
        prepareDependencyDescriptor: function (thisNamespace, desc) {
            var descriptor = {}
            
            //turning into object if necessary
            if (typeof desc == 'string') 
                descriptor.Module = desc
            else if (typeof desc == 'object') {
                
                if (desc.url) 
                    descriptor.url = desc.url
                else if (desc.Module) {
                    descriptor.Module = desc.Module
                    
                    if (desc.version) descriptor.version = desc.version
                } else Joose.O.each(desc, function (version, Module) {
                    descriptor.Module = Module
                    descriptor.version = version
                })
 
            }
            
            // ext:// to presence transformation, existing presence attribute will be overwritten!
            if (/^ext:\/\//.test(descriptor.Module)) {
                descriptor.Module = descriptor.Module.replace(/^ext:\/\//, '')
                var moduleName = descriptor.Module
                
                descriptor.presence = function () {
                    return eval(moduleName)
                }
            }
            
            var depName = descriptor.depName = descriptor.Module || descriptor.url

            if (!depName) throw "Empty dependency name for Module=[" + thisNamespace + "]"
            
            //if there is no such dependency already
            if (!thisNamespace.meta.dependencies[depName]) {
                
                //descriptor of Module dependency
                if (descriptor.Module) {
                    
                    //non-Joose
                    if (descriptor.presence) {
                        descriptor.Module = Joose.Namespace.Manager.my.prepareVirtual(descriptor.Module)
                        if (!descriptor.Module.meta.presence) descriptor.Module.meta.presence = descriptor.presence
                    } else {
                        //Joose
                        
                        //dependencies are always calculating from global namespace
                        //turning string into Namespace instance, possible creating new namespace
                    	descriptor.Module = Joose.Namespace.Manager.my.create(descriptor.Module, Joose.Namespace.Keeper, null, Joose.Namespace.Manager.my.global)
                    } 
                    
                } else {
                    //descriptor of url dependency
                    descriptor.Module = Joose.Namespace.Manager.my.prepareVirtual(descriptor.url)
                    descriptor.Module.meta.url = descriptor.url
                    JooseX.Namespace.Depended.Transport.ScriptTag.meta.apply(descriptor.Module.meta)
                }
            }
            
            return descriptor
        },
        
        
        prepareDependencies : function (dependenciesInfo){
            if (!dependenciesInfo) return
            
            var thisNamespace = this.c
            
            dependenciesInfo = Joose.O.wantArray(dependenciesInfo)
            
            Joose.A.each(dependenciesInfo, function(descriptor) {
                this.processDescriptor(this.prepareDependencyDescriptor(thisNamespace, descriptor))
            }, this)
        },
        

        processDescriptor : function(descriptor){
            if (this.needDescriptor(descriptor)) this.addDescriptor(descriptor)
        },
        
        
        needDescriptor : function (descriptor) {
            //if we already have this this dependency or if the Module in descriptor is ready  - we dont need it
            return !( this.dependencies[descriptor.depName] || descriptor.Module.meta.ready )
        },
        
        
        addDescriptor : function (descriptor){
            var thisNamespace = this.c
            var depName = descriptor.depName
            var dependedModule = descriptor.Module
            
            //pushing listener to the end(!) of the list
            dependedModule.meta.readyListeners.push(function(){
                
                if (descriptor.version) {
                    if (!dependedModule.meta.version) throw "Loaded descriptor " + dependedModule + " has no specified version. Required version is: " + descriptor.version
                    
                    if (dependedModule.meta.version < descriptor.version) 
                        throw "Loaded descriptor " + dependedModule + " has lower version [" + dependedModule.meta.version + "] than required [" + descriptor.version + "]"
                }
                
                delete thisNamespace.meta.dependencies[depName]
                thisNamespace.meta.finalizeDependencies()
            })
            
            //adding dependency
            this.dependencies[depName] = descriptor
            
            //we are not ready, since there are depedencies to load                
            this.ready = false
        },
        
        
        processDependencies : function (){
            Joose.O.eachSafe(this.dependencies || {}, function(descriptor) {
                descriptor.Module.meta.handleLoad()
            })
        },
        
        
        finalizeDependencies : function() {
            if (!Joose.O.isEmpty(this.dependencies)) return
            
            if (this.BEGIN) {
            	var BEGIN = this.BEGIN
            	delete this.BEGIN
            	
                var me = this
                
                BEGIN.call(this.c, function(){
                    me.fireReady()
                })
            } else 
                this.fireReady()
        },
        
        
        fireReady: function(){
            this.ready = true
            
            var listeners = this.readyListeners || []
            this.readyListeners = []
            
            Joose.A.each(listeners, function(listener){
                listener()
            })
        },
        
        
        getUrls: function () {
            if (this.url) return typeof this.url == 'function' ? this.url() : this.url
            
            var urls = []
            var className = this.name.split('.')
            
            Joose.A.each(Joose.Namespace.Manager.my.INC, function (libroot) {
                urls.push(libroot.concat(className).join('/') + '.js' + (Joose.Namespace.Manager.my.disableCaching ? '?disableCaching=' + new Date().getTime() : '') )
            })
            
            return urls
        },
        
        
        handleLoad: function() {
            var thisNamespace = this.c
            
            try {
                if (this.loaded || typeof this.presence == 'function' && this.presence()) {
                    this.finalizeDependencies()
                    return
                }
            } catch (e) { }
            
            
            if (this.loading) return
            this.loading = true
            
            var urls = this.getUrls()
            if (!(urls instanceof Array)) urls = [ urls ]
            
            var onready = function() {
                thisNamespace.meta.loaded = true
                thisNamespace.meta.loading = false
                thisNamespace.meta.finalizeDependencies()
            }
            
            var onerror = function(){
                //if no more urls
                if (!urls.length) throw "Module=[" + thisNamespace + "] not found"
                
                Joose.Namespace.Manager.my.executeIn(Joose.Namespace.Manager.my.global, function (){
                    this.load(urls.shift(), onready, onerror)
                }, thisNamespace.meta)
            }
            
            //inside of the "load" function will be declared new module/class
            //new classes are always declaring in the global namespace
            Joose.Namespace.Manager.my.executeIn(Joose.Namespace.Manager.my.global, function (){
                this.load(urls.shift(), onready, onerror)
            }, this)
            
        },
        

        load : function(){
            throw "You need to apply one of the Transporting Roles"
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
