Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    
        have : {
            
            containResources                : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ],
            
            INC                             : [ 'lib', '/jsan' ],
            
            disableCaching                  : true,
            
            resources                       : {},
            
            resourceTypes                   : {},
            
            ANONYMOUS_RESOURCE_COUNTER      : 0
        },
    
        
        
        methods : {
            
            //get own resource of some thing (resource will be also attached to that abstract thing)
            //if the something is requesting own resource its considered loaded
            getMyResource : function (type, token, me) {
                var resource = this.getResource({
                    type : type,
                    token : token
                })
                
                if (resource.attachedTo && resource.attachedTo != me) throw resource + " is already attached to [" + resource.attachedTo + "]"
                
                resource.attachedTo = me
                resource.loaded = true
                resource.loading = false
                
                return resource
            },
            
            
            getResource : function (descriptor) {
                var type, token, requiredVersion
                
                if (typeof descriptor == 'object') {
                    type                = descriptor.type
                    token               = descriptor.token
                    requiredVersion     = descriptor.version
                    
                    delete descriptor.version
                    
                } else 
                    if (typeof descriptor == 'string') {
                    
                        var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                        
                        if (!match) {
                            type = 'joose'
                            token = descriptor
                        } else {
                            type = match[1]
                            token = match[2]
                        }
                    }
                    
                if (!token) token = '__ANONYMOUS_RESOURCE__' + this.ANONYMOUS_RESOURCE_COUNTER++
                
                var id = type + '://' + token
                
                var resource = this.resources[id]
                
                if (!resource) {
                    var resourceClass = this.resourceTypes[type]
                    if (!resourceClass) throw "Unknown resource type: [" + type + "]"
                    
                    resource = this.resources[id] = new resourceClass(typeof descriptor == 'object' ? descriptor : { 
                        token : token,
                        
                        type : type
                    })
                }
                
                resource.setRequiredVersion(requiredVersion)
                
                return resource
            },
            
            
            registerResourceClass : function (typeName, resourceClass) {
                this.resourceTypes[typeName] = resourceClass
            },
            
            
            use : function (dependenciesInfo, callback, scope) {
                var nsManager = Joose.Namespace.Manager.my
                var global = nsManager.global
                
                Class({
                    use    : dependenciesInfo,
                    
                    body   : function () {
                        if (callback) nsManager.executeIn(global, function (ns) {
                            callback.call(scope || this, ns)
                        })
                    }
                })
            }
            
        }
    }
})

use = function (dependenciesInfo, callback, scope) {
    JooseX.Namespace.Depended.Manager.my.use(dependenciesInfo, callback, scope) 
}


Joose.FutureClass = function (className) { return function () { return eval(className) } };
Class('JooseX.Namespace.Depended.Resource', {
    
    has : {
        
        attachedTo          : null,
        
        type                : null,
        token               : null,
        
        id                  : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        loadedFromURL       : null,
        
        readyListeners      : Joose.Array,
        
        dependencies        : Joose.Object,
        
        onBeforeReady       : { is : 'rw', init : null },
        readyDelegated      : false,
        
        version             : { is : 'rw', init : null },
        requiredVersion     : { is : 'rw', init : null }
    },
    
    
    after: {
        
        initialize: function () {
            if (!this.id) this.id = this.type + '://' + this.token
        }
        
    },

    
    
    methods: {
        
        setOnBeforeReady : function (func) {
            if (this.onBeforeReady) throw "Can't redefine 'onBeforeReady' for " + this
            
            this.onBeforeReady = func
        },
        
        
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
            return "Resource: id=[" + this.id + "], type=[" + this.meta.name + "]"
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
            Joose.O.eachOwn(this.dependencies || {}, function (resource) {
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
                    }, me)
                }
            } else 
                this.fireReady()
        },
        
        
        fireReady: function () {
            var me = this
            
            setTimeout(function () {
                me.ready = true
                
                var listeners = me.readyListeners || []
                me.readyListeners = []
                
                Joose.A.each(listeners, function (listener) {
                    listener()
                })
            }, 0)
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
            
            var onsuccess = function (resourceBlob, url) {
                me.loaded = true
                me.loading = false
                
                me.loadedFromURL = url
                
                me.materialize(resourceBlob, me.checkReady, me)
                
                me.checkReady()
            }
            
            var onerror = function (e) {
                //if no more urls
                if (!urls.length) throw me + " not found" 
                
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
;
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

});
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
//});
Role('JooseX.Namespace.Depended.Transport.XHRAsync', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var req = new JooseX.SimpleRequest()
            
            try {
                req.getText(url, true, function (success, text) {
                    
                    if (!success) { 
                        onerror(this + " not found") 
                        return 
                    }
                    
                    onsuccess(text, url)
                })
            } catch (e) {
                onerror(e)
            }
        }
        
    }
    
})
;
Role('JooseX.Namespace.Depended.Transport.XHRSync', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var req = new JooseX.SimpleRequest()
            var text; 
            
            try {
                text = req.getText(url)
            } catch (e) {
                onerror(e)
                return
            }
            
            onsuccess(text, url)
        }
    }
})
;
Role('JooseX.Namespace.Depended.Transport.ScriptTag', {

    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var loaderNode = document.createElement("script")
            
            loaderNode.onload = loaderNode.onreadystatechange = function () {
                if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200)
                    //surely for IE6..
                    setTimeout(function () { onsuccess(loaderNode.text, url) }, 1)
            }
            
            loaderNode.setAttribute("type", "text/javascript")
            loaderNode.setAttribute("src", url)
            document.getElementsByTagName("head")[0].appendChild(loaderNode)
        },

        
        materialize : function () {
        }
        
    }
    
})
;
Class('JooseX.Namespace.Depended.Resource.JavaScript', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Transport.XHRAsync, JooseX.Namespace.Depended.Materialize.Eval ]
})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('javascript', JooseX.Namespace.Depended.Resource.JavaScript)
;
Class('JooseX.Namespace.Depended.Resource.JavaScript.JooseClass', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    methods : {
        
        getUrls : function () {
            var urls = []
            var className = this.token.split('.')
            
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                libroot = libroot.replace(/\/$/, '')
                urls.push( [ libroot ].concat(className).join('/') + '.js' + (JooseX.Namespace.Depended.Manager.my.disableCaching ? '?disableCaching=' + new Date().getTime() : '') )
            })
            
            return urls
        }
        
    },
    
    
    override : {
        
        addDescriptor : function (descriptor) {
            if (typeof descriptor == 'object' && !descriptor.token) 
                Joose.O.eachOwn(descriptor, function (version, name) {
                    this.addDescriptor({
                        type : 'joose',
                        token : name,
                        version : version
                    })
                }, this)
            else
                this.SUPER(descriptor)
        }

    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('joose', JooseX.Namespace.Depended.Resource.JavaScript.JooseClass)
;
Class('JooseX.Namespace.Depended.Resource.JavaScript.NonJoose', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript.JooseClass,
    
    
    have : {
        presence : null
    },
    
    
    after: {
        
        initialize: function () {
            var me = this
            
            if (!this.presence) this.presence = function () {
                return eval(me.token)
            }
        }
        
    },

    
    methods : {
        
        isLoaded : function () {
            var isPresent = false
            
            try {
                isPresent = this.presence()
            } catch (e) {
            }
            
            return isPresent || this.SUPER()
        }
        
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('nonjoose', JooseX.Namespace.Depended.Resource.JavaScript.NonJoose)
;
//describes the behavior of resource, who's token is an URL

Role('JooseX.Namespace.Depended.Resource.URLed', {
    
    methods : {
        
        getUrls : function () {
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) return [ url ]
            
            var urls = []
            
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                urls.push(libroot.replace(/\/?$/, '/') + url)
            })
            
            return urls
        }
        
    }

})
;
Class('JooseX.Namespace.Depended.Resource.JavaScript.ExternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    does : [ JooseX.Namespace.Depended.Resource.URLed, JooseX.Namespace.Depended.Transport.ScriptTag ],

    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (!/^http/.test(url) && !/^\//.test(url)) throw "Can't use relative URL for resource [" + this + "]"
        }
    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('exturl', JooseX.Namespace.Depended.Resource.JavaScript.ExternalURL);
Class('JooseX.Namespace.Depended.Resource.JavaScript.InternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    does : JooseX.Namespace.Depended.Resource.URLed,
    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) throw "Can't use absolute URL for resource [" + this + "]"
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('inturl', JooseX.Namespace.Depended.Resource.JavaScript.InternalURL);
Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProperties' ],
    
    
    have : {
        containResources                    : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ]
    },

    
    override: {
        
        prepareProperties : function (name, extend, defaultMeta) {
            
            if (typeof name != 'string') {
                extend = name
                name = null
            }
            
            extend = extend || {}
            
            var summaredDeps = []
            
            var extendMy = extend.my
            
            //gathering all the related resourses from various builders
            //also gathering resourses of 'my'
            Joose.A.each(this.containResources, function (propName) {
                
                this.collectDependencies(extend[propName], summaredDeps)
                    
                if (extendMy && extendMy[propName]) this.collectDependencies(extendMy[propName], summaredDeps)
            }, this)
            

            //and from externally collected additional resources 
            this.alsoDependsFrom(extend, summaredDeps)
            
            
            var resource = JooseX.Namespace.Depended.Manager.my.getResource({
                type : 'joose',
                token : name
            })
            
            
            if (extend.VERSION) {
                resource.setVersion(extend.VERSION)
                
                delete extend.VERSION
            }
            
            //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
            //this allows to manually control the "ready-ness" of module (custom pre-processing)
            //BEGIN receives the function (callback), which should be called at the end of custom processing 
            if (extend.BEGIN) {
                resource.setOnBeforeReady(extend.BEGIN)
                
                delete extend.BEGIN
            }
            
            Joose.A.each(summaredDeps, function (descriptor) {
                resource.addDescriptor(descriptor)
            })
            
            var me = this
        
            //unshift is critical for correct order of readyListerens processing!
            //constructing is delaying until resource will become ready 
            resource.readyListeners.unshift(function () {
                
                me.construct(name, extend, resource, defaultMeta)
            })
            
            //skip constructing for anonymous classes w/o dependencies 
            if (!name && Joose.O.isEmpty(resource.dependencies)) {
                this.inlineDependencies(extend)
                
                var extendMy = extend.my
                
                if (extendMy) this.inlineDependencies(extendMy)
                
                return this.SUPER(name, extend, defaultMeta)
            }
            
            resource.handleDependencies()
            
            return {
                name : name,
                meta : Joose.Namespace.Keeper,
                props : {}
            }
        },
        
        
        create : function () {
            var meta = this.SUPERARG(arguments).meta
            
            meta.resource = meta.resource || JooseX.Namespace.Depended.Manager.my.getMyResource('joose', meta.name, meta.c)
            
            return meta.c
        }
    },
    //eof override
    
    
    methods : {
        
        alsoDependsFrom : function (extend, summaredDeps) {
        },
        
        
        collectDependencies : function (from, to) {
            Joose.A.each(Joose.O.wantArray(from), function (descriptor) {
                if (descriptor && typeof descriptor != 'function') to.push(descriptor)
            })
        },
        
        
        construct : function (name, extend, resource, defaultMeta) {
            this.inlineDependencies(extend)
            
            var extendMy = extend.my
            
            if (extendMy) this.inlineDependencies(extendMy)
            
            var meta = extend.meta
            delete extend.meta
            
            if (!meta)
                if (extend.isa) 
                    meta = extend.isa.meta.constructor
                else
                    meta = defaultMeta
            
            this.create(name, meta, extend)
        },
        
        
        inlineDependencies : function (extend) {
            delete extend.use
            
            Joose.A.each(this.containResources, function (propName) {
                
                if (extend[propName]) {
                
                    var descriptors = []
                    
                    Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor, index) {
                        
                        if (typeof descriptor == 'function')
                            descriptors.push(descriptor)
                        else
                            if (typeof descriptor == 'object')
                                if (descriptor.token)
                                    descriptors.push(eval(descriptor.token)) 
                                else
                                    Joose.O.each(descriptor, function (version, name) { 
                                        descriptors.push(eval(name)) 
                                    })
                            else 
                                if (typeof descriptor == 'string')
                                    descriptors.push(eval(descriptor))
                                else 
                                    throw "Wrong dependency descriptor format: " + descriptor
                        
                    })
                    
                    if (propName != 'isa' && propName != 'meta')
                        extend[propName] = descriptors
                    else
                        if (descriptors.length > 1) 
                            throw "Cant specify several super- or meta- classes"
                        else
                            extend[propName] = descriptors[0]
                        
                }
            })
            
            this.alsoInline(extend)
        },
        
        
        alsoInline : function (extend) {
        }
    
    }
})


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})

;
//Joose.Managed.Bootstrap.meta.extend({
//    
//    have : {
//        resource            : null
//    },
//    
//    
//    after: {
//        
//        construct: function () {
//            this.resource = this.resource || JooseX.Namespace.Depended.Manager.my.getMyResource('joose', this.name, this.c)
//        }
//    }
//})
//
//
Joose.Namespace.Keeper.meta.extend({
    
    after: {
        
        copyNamespaceState: function (targetClass) {
            
            targetClass.meta.resource = this.resource
        }
    }
});
