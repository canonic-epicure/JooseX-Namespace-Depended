Class('JooseX.Namespace.Depended.Resource', {
    
    have : {
        
        attachedTo          : null,
        
        type                : null,
        token               : null,
        
        id                  : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        readyListeners      : null,
        
        dependencies        : null,
        
        onBeforeReady       : null,
        readyDelegated      : false
    },
    
    
    has : {
        version             : { is : 'rw', init : null },
        requiredVersion     : { is : 'rw', init : null }
    },
    
    
    after: {
        
        initialize: function () {
            this.dependencies = {}
            this.readyListeners = []
            
            if (!this.id) this.id = this.type + '://' + this.token
        }
        
    },

    
    
    methods: {
        
        setVersion : function (version) {
            if (!version) return
            
            if (this.version) throw "Cant redefine version of " + this
            
            var requiredVersion = this.requiredVersion
            
            if (requiredVersion && version < requiredVersion) throw "Versions conflict on " + this + " required [" + requiredVersion + "], got [" + version + "]"
                
            this.version = version
        },
        
        
        setRequiredVersion : function (version) {
            if (!version) return
            
            var requiredVersion = this.requiredVersion
            
            if (!requiredVersion || version > requiredVersion) 
                if (this.isLoaded() || this.loading)
                    throw "Cant increase required version - " + this + " is already loaded"
                else
                    this.requiredVersion = version
        },
        
        
        toString : function () {
            return "Resource: id=[" + this.id + "] type=[" + this.meta.name + "]"
        },
        
        
        addDescriptor : function (descriptor) {
            var resource = JooseX.Namespace.Depended.Manager.my.getResource(descriptor)
            
            //if there is already such dependency or the resource is ready
            if (this.dependencies[resource.id] || resource.ready) return
            
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
        
        
        handleDependencies : function () {
            // || {} required for classes on which this Role was applied after they were created - they have this.dependencies not initialized
            Joose.O.eachSafe(this.dependencies || {}, function (resource) {
                resource.handleLoad()
            })
            
            this.checkReady()
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
            
            var onsuccess = function (resourceBlob) {
                me.loaded = true
                me.loading = false
                
                me.materialize(resourceBlob)
                
                me.checkReady()
            }
            
            var onerror = function (e) {
                //if no more urls
                if (!urls.length) throw e
                
                me.load(urls.shift(), onsuccess, onerror)
            }
            
            this.load(urls.shift(), onsuccess, onerror)
        },
        

        getUrls: function () {
            throw "Abstract resource method 'getUrls' was called"
        },
        
        
        load : function () {
            throw "Abstract resource method 'load' was called"
        },
        
        
        materialize : function (resourceBlob) {
            throw "Abstract resource method 'materialize' was called"
        }
        
    }
})
