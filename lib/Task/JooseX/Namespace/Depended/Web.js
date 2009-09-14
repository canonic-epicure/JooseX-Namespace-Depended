Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC                          : [ 'lib', '/inc' ],
			
			disableCaching               : true,
            
            resources                    : {},
            
            resourceTypes                : {},
            
            ANONYMOUS_CLASS_COUNTER      : 0
    	},

    	
        methods : {
            
            getMyResource : function (type, token, me) {
                if (!token) token = '__ANONYMOUS_CLASS__' + this.ANONYMOUS_CLASS_COUNTER++
                
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
                    
                } else if (typeof descriptor == 'string') {
                
                    var match = /^(\w+):\/\/(.+)/.exec(descriptor)
                    
                    if (!match) {
                        type = 'js'
                        token = descriptor
                    } else {
                        type = match[1]
                        token = match[2]
                    }
                }
                    
                var id = type + '://' + token
                
                if (!this.resources[id]) {
                    var resourceClass = this.resourceTypes[type]
                    if (!resourceClass) throw "Unknown resource type: [" + type + "]"
                        
                    this.resources[id] = new resourceClass(typeof descriptor == 'object' ? descriptor : { 
                        id : id, 
                        token : token
                    })
                }
                
                this.resources[id].setRequiredVersion(requiredVersion)
                
                return this.resources[id]
            },
            
            
            registerResourceClass : function (typeName, resourceClass) {
                this.resourceTypes[typeName] = resourceClass
            },
            
            
	        use : function (dependenciesInfo, callback, scope) {
                var nsManager = Joose.Namespace.Manager.my
                var global = nsManager.global
                
                new Joose.Namespace.Keeper(null, {
	                use    : dependenciesInfo,
	                body   : function () {
                        
	                    if (callback) nsManager.executeIn(global, callback, global.meta.ns.container, [ global ])
	                }
	            })
	        }
            
        }
    }
    
})

use = function (dependenciesInfo, callback, scope) {
    JooseX.Namespace.Depended.Manager.my.use(dependenciesInfo, callback, scope) 
}


Joose.FutureClass = function (className) { return function () { return eval(className) } }
;
Class('JooseX.Namespace.Depended.Resource', {
    
    has : {
        
        attachedTo          : null,
        
        type                : null,
        token               : null,
        
        id                  : null,
        
        loading             : false,
        loaded              : false,
        ready               : false,
        
        url                 : null,
        
        readyListeners      : Joose.Array,
        
        dependencies        : Joose.Object,
        
        onBeforeReady       : null,
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
                    }, me)
                }
            } else 
                this.fireReady()
        },
        
        
        fireReady: function () {
            this.ready = true
            
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
            
            var onsuccess = function (resourceBlob, url) {
                me.loaded = true
                me.loading = false
                
                me.url = url
                
                me.materialize(resourceBlob)
                
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
        
        materialize : function (resourceBlob) {
            eval(resourceBlob)
        }
        
    }

});
//XXX several failures in FF(?)

Role('JooseX.Namespace.Depended.Materialize.Script', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob) {
            var loaderNode = document.createElement("script")
            
//            loaderNode.onload = loaderNode.onreadystatechange = function () {
//                if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200)
//                    //surely for IE6..
//                    setTimeout(ready, 1)
//            }
            
            loaderNode.text = resourceBlob
//            document.getElementsByTagName("head")[0].appendChild(loaderNode)
            
            //adding to body, because Safari do not create HEAD for iframe's documents
            document.body.appendChild(loaderNode)
        }
        
    }

});
Role('JooseX.Namespace.Depended.Transport.AjaxAsync', {
    
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
Role('JooseX.Namespace.Depended.Transport.AjaxSync', {
    
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
Class('JooseX.Namespace.Depended.Resource.URL', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
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
Class('JooseX.Namespace.Depended.Resource.URL.JS', {
    
    isa : JooseX.Namespace.Depended.Resource.URL,
    
//    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
    does : [ JooseX.Namespace.Depended.Transport.ScriptTag ]
    
//    ,
//    after: {
//        
//        initialize: function () {
//            var url = this.token
//            
//            if (/^http/.test(url)) JooseX.Namespace.Depended.Transport.ScriptTag.meta.apply(this)
//        }
//        
//    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('jsurl', JooseX.Namespace.Depended.Resource.URL.JS)
;
Class('JooseX.Namespace.Depended.Resource.JS', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
    
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
                Joose.O.eachSafe(descriptor, function (version, name) {
                    this.addDescriptor({
                        type : 'js',
                        token : name,
                        version : version
                    })
                }, this)
            else
                this.SUPER(descriptor)
        }

    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('js', JooseX.Namespace.Depended.Resource.JS)
;
Class('JooseX.Namespace.Depended.Resource.JS.External', {
    
    isa : JooseX.Namespace.Depended.Resource.JS,
    
    does : [ JooseX.Namespace.Depended.Transport.AjaxAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
    
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

JooseX.Namespace.Depended.Manager.my.registerResourceClass('ext', JooseX.Namespace.Depended.Resource.JS.External)
;
Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProps' ],
    
    have : {
        version             : null,
        
        resource            : null,
        
        containResources    : [ 'isa', 'does', 'metaRole', 'metaRoles', 'trait', 'traits' ]
    },
    
    
    override: {
        
        prepareProps: function (extend) {
            var me = this
            extend = extend || {}
            
            //the case of pure namespace keeper creation (not Module) - such keeper should not have a resource
            if (this instanceof Joose.Namespace.Keeper && Joose.O.isEmpty(extend)) return this.SUPER(extend)
            
            if (!this.resource) this.resource = JooseX.Namespace.Depended.Manager.my.getMyResource('js', this.name, this.c)
            
            var resource = this.resource
            
            if (!resource.ready) {
                
                if (extend.version) {
                    this.version = extend.version
                    delete extend.version
                    
                    resource.setVersion(this.version)
                }
                
                //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
                //this allows to manually control the "ready-ness" of module (custom pre-processing)
                //BEGIN receives the function (callback), which should be called at the end of custom processing 
                if (extend.BEGIN) {
                    var BEGIN = extend.BEGIN
                    delete extend.BEGIN
                    
                    resource.onBeforeReady = function (ready, resource) {
                        BEGIN.call(me.c, ready, resource)
                    }
                }
                
                var extendUse = Joose.O.wantArray(extend.use || [])
                var extendMy = extend.my
                
                //gathering all the related resourses from various builders
                //also gathering resourses of 'my'
                Joose.A.each(this.containResources, function (propName) {
                    if (extend[propName])
                        Joose.A.each(Joose.O.wantArray(extend[propName]), function (descriptor) {
                            
                            if (typeof descriptor != 'function') extendUse.push(descriptor)
                        })
                        
                    if (extendMy && extendMy[propName])
                        Joose.A.each(Joose.O.wantArray(extendMy[propName]), function (descriptor) {
                            
                            if (typeof descriptor != 'function') extendUse.push(descriptor)
                        })
                })
                
                //and from 'use' builder
                if (extendMy && extendMy.use) {
                    extendUse.push.apply(extendUse, Joose.O.wantArray(extendMy.use))
                    
                    delete extendMy.use
                }
                
                //and from externally collected additional resources 
                extendUse = extendUse.concat(this.alsoDependsFrom(extend))
                
                
                Joose.A.each(extendUse, function (descriptor) {
                    resource.addDescriptor(descriptor)
                })
                delete extend.use
            
                //unshift is critical for correct order of readyListerens processing!
                //constructing is delaying until module will become ready 
                resource.readyListeners.unshift(function () {
                    me.construct(extend)
                })
                
                resource.handleDependencies()
                
                return false
                
            } else {
                
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
                        
                        if (propName != 'isa')
                            extend[propName] = descriptors
                        else
                            if (descriptors.length > 1) 
                                throw "Cant specify several superclasses"
                            else
                                extend[propName] = descriptors[0]
                            
                    }
                })
                
                return this.SUPER(extend)
            }
        }
        //eof construct
    },
    //eof override
    
    methods : {
        
        alsoDependsFrom : function (extend) {
            return []
        },
        
        
        collectDependenciesFrom : function () {
            var result = []
            
            Joose.A.each(arguments, function (argument) {
                Joose.A.each(Joose.O.wantArray(argument), function (descriptor) {
                    if (descriptor && typeof descriptor != 'function') result.push(descriptor)
                    
                })
            })
            
            return result
        }
    }
})

Joose.Managed.Bootstrap.meta.extend({
    does : JooseX.Namespace.Depended
});
