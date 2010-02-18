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
                    
                if (!token) {
                    token = '__ANONYMOUS_RESOURCE__' + this.ANONYMOUS_RESOURCE_COUNTER++
                    descriptor = undefined
                }
                
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


Joose.I.FutureClass = function (className) { return function () { return eval(className) } };
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
        
        readyListeners      : Joose.I.Array,
        
        dependencies        : Joose.I.Object,
        
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
        
        
        checkReady : function () {
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
            eval.call(Joose.top, resourceBlob)
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
            
//            if (Joose.is_IE) var errorTimeOut
            
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
Class('JooseX.Namespace.Depended.Resource.JooseClass', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Transport.XHRAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
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

JooseX.Namespace.Depended.Manager.my.registerResourceClass('joose', JooseX.Namespace.Depended.Resource.JooseClass)
;
Class('JooseX.Namespace.Depended.Resource.NonJoose', {
    
    isa : JooseX.Namespace.Depended.Resource.JooseClass,
    
    
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

JooseX.Namespace.Depended.Manager.my.registerResourceClass('nonjoose', JooseX.Namespace.Depended.Resource.NonJoose)
;
//describes the behavior of resource, who's token is an URL

Role('JooseX.Namespace.Depended.Locator.URL', {
    
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
Class('JooseX.Namespace.Depended.Resource.ExternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Locator.URL, JooseX.Namespace.Depended.Transport.ScriptTag ],

    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (!/^http/.test(url) && !/^\//.test(url)) throw "Can't use relative URL for resource [" + this + "]"
        }
    }
    

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('exturl', JooseX.Namespace.Depended.Resource.ExternalURL);
Class('JooseX.Namespace.Depended.Resource.InternalURL', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    does : [ JooseX.Namespace.Depended.Locator.URL, JooseX.Namespace.Depended.Transport.XHRAsync, JooseX.Namespace.Depended.Materialize.Eval ],
    
    after : {
        
        initialize : function () {
            
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) throw "Can't use absolute URL for resource [" + this + "]"
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('inturl', JooseX.Namespace.Depended.Resource.InternalURL);
Role('JooseX.Namespace.Depended', {
    
    meta : Joose.Managed.Role,
    
    requires : [ 'prepareProperties' ],
    
    
    have : {
        containResources                    : [ 'use', 'meta', 'isa', 'does', 'trait', 'traits' ]
    },

    
    override: {
        
        prepareProperties : function (name, extend, defaultMeta, callback) {
            
            if (name && typeof name != 'string') {
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
            
            
            setTimeout(function () {
                resource.handleDependencies()
            }, 0)
            
            
            //skip constructing for classes w/o dependencies 
            if (Joose.O.isEmpty(resource.dependencies)) {
                this.inlineDependencies(extend)
                
                return this.SUPER(name, extend, defaultMeta, callback)
            } 

            
            var me = this
        
            //unshift is critical for correct order of readyListerens processing!
            //constructing is delaying until resource will become ready 
            resource.readyListeners.unshift(function () {
                me.inlineDependencies(extend)
                
                me.prepareProperties(name, extend, defaultMeta, callback)
            })
            
            return this.create(name, Joose.Namespace.Keeper, {})
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
        
        
        inlineDependencies : function (extend) {
            this.inlineDeps(extend)
            
            var extendMy = extend.my
            
            if (extendMy) this.inlineDeps(extendMy)
        },
        
        
        inlineDeps : function (extend) {
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
        }
    }
})


Joose.Namespace.Manager.meta.extend({
    does : JooseX.Namespace.Depended
})


Joose.Namespace.Keeper.meta.extend({
    
    after: {
        
        copyNamespaceState: function (targetClass) {
            targetClass.meta.resource = this.resource
        }
    }
})


/**

Name
====


JooseX.Namespace.Depended - a dependencies handling framework for Joose3 


SYNOPSIS
========

        Class("MyApp.Widget.Header", {
        
            //declare dependencies
            use : [ 'MyApp.Widget.LoginLine', 'MyCompany.Util.Helper'],
            
            does : 'MyApp.Role.Templated',
            
            
            before : {
            
                initComponent : function () {
                
                    //dependencies will be preloaded #1
                    this.add(new MyApp.Widget.LoginLine({
                        ...
                    }))
                }
            }, 
            
            methods : {
            
                doSomething : function () {
                    //dependencies will be preloaded #2
                    MyCompany.Util.Helper.my.doSomething()
                }
            }
        })
        
        
or with versions:         
        
        Class("MyApp.Widget.Header", {
            
            VERSION : 0.11,
        
            use : [ { 'MyApp.Widget.LoginLine' : 0.03, { 'MyCompany.Util.Helper' : 0.01 } ],
            
            isa : { 'MyApp.Widget.Templated' : 0.01 },
            
            //alternatively
            
            use : { 
                'MyApp.Widget.LoginLine' : 0.03,
                'MyCompany.Util.Helper' : 0.01 
            }
        })
        
non Joose code also allowed:        

        Class("MyApp.Widget.Header", {
            
            VERSION : 0.11,
        
            use : [ 'nonjoose://MyApp.Widget.LoginLine' ]
        })
        
from code:

        use({ 'MyApp' : 0.01 }, function () {
            
            MyApp.my.run()
        })

DESCRIPTION
===========

`JooseX.Namespace.Depended` is a dependencies handling framework, tightly integrated with Joose3. 

It allows you to refer to other (not yet loaded) classes/roles in your class declaration. 

Framework is highly customizable, additional resources/transport/materialization modes can be easily added.
Please refer to [JooseX.Namespace.Depended.Authoring][authoring] for more information. 

By default, framework operates in asynchronous mode, using XHR requests for transport and `eval` for "materialization".
All edge cases like refering to already loaded class, double loading, etc are handled correctly. 

 

CURRENT DEVELOPMENT STATUS
==========================

This framework is considered stable and thoroughly tested (more than 300 unit tests, including stress-test). 
The use case for "pure" Joose classes will be supported without breaking changes. 

However, as its not settled down yet, the syntax for loading *non Joose* code may be changed any time, without prior notice.


USAGE
=====

Dependency descriptor
---------------------

All dependencies should be specified with the *dependency descriptors*. In the simplest case, the descriptor is just a plain string 
with the name of class:

        'MyApp.Widget.Header'
    
In more complex case, the descriptor is an object, which keys are classes names and values - their's versions:

        {
            'MyApp.Widget.Header'   : 0.03,
            'MyApp.Util.Helper'     : 0.01
        }
        
Such descriptors can contain several dependencies, though they are limited to Joose classes only.

In general case, the dependency descriptor is an object with the following structure:
        
        {
            type    : 'joose',
            token   : 'MyApp.Widget.Header',
            version : 0.03
        }
        
Such descriptor can contain exactly one dependency, with the resource of any type.


The rule
--------

General rule is - whereever in your class declaration you can refer to other class (for example in the `does` builder) - you can specify the
dependency descriptor instead. 

This means, that you can specify the dependencies in:

    - `meta` builder (!)
    - `isa` builder
    - `trait` builder
    - `does` builder
    
    
For example this declaration is perfectly valid:    
    
            Class('Some.Class', {
                meta : 'My.Meta',
                
                isa : 'Super.Class',
                
                does : {
                    'Some.Role'         : 0.01,
                    'Some.Other.Role'   : 0.02
                },
                
                trait : 'Some.Trait',
                
                ...
            })
    
Also in any other custom builder (some [authoring][] required) 

The framework will scan class declaration for dependencies, pre-load them, then substitute descriptors with actual classes and continue the declaration process.


`use` builder
-------------

Additionaly, you can provide an array of dependencies (or a single dependency) in the `use` builder:
            
            Class('Some.Class', {
                
                use : [ 'Some.Other.Class', 'Some.Other.Role' ],
                
                ...
            })


`use` from code
---------------

You can also load the dependencies from code:

            use([ 'Some.Class1', 'Some.Class2' ], function () {
                
                var a = new Some.Class1()
                var b = new Some.Class2()
            })


Class name -> file name conversion
----------------------------------

The class name you are refering to, will be converted to file name using this simple scheme:

        class name: MyClass
        file  name: MyClass.js
        
        class name: Some.Class
        file  name: Some/Class.js
        
        class name: Some.Other.Class
        file  name: Some/Other/Class.js
    
Generally each dot is replaced with directory separator, and the 'js' extension is appended to result
    

The libraries
-------------

The framework can look up the classes in several *libraries*, which are just the directories, containing the source files.

The current list of libraries is stored as an array in: `JooseX.Namespace.Depended.Manager.my.INC`. Default value is:

        JooseX.Namespace.Depended.Manager.my.INC = [ 'lib', '/jsan' ]

You can freely modify this value. For example, if you are running a test harness, as `t/index.html`, and would like to refer
to your files, which are in `lib/`, you'll need to add the `../lib` entry.

Framework will scan through the libraries list sequentially and attempt to load the class from every entry.
Class will be loaded from the first library, which contains the corresponded file. If there are no such file,
loading will continue to another entry.

For example, if we are loading class `Some.Class`, and we have the default setting for libraries, then first it will be tried to load with the following URL:
    
        lib/Some/Class.js
    
If there are no such file, the 2nd entry will be tried:
        
        /jsan/Some/Class.js

If there are no such file again, the exception will be thrown.


ATTRIBUTE HELPER
================

This package adds a new [attribute initializer](http://openjsan.org/go?l=Joose.Manual.Attributes): `Joose.I.FutureClass`

It can be used, when the default value of the attribute should be set to the constructor of some class, 
which may be not yet loaded on the declaration stage:


        Class('MyApp.Widget.Template', {
            
            use : 'MyApp.Util.Helper',
            
            has : {
                helperClass : Joose.I.FutureClass('MyApp.Util.Helper')
            }
        
        })



GROUPED LOADING MODE
====================

This framework can operate in special mode, in which it can load *any* class, with *any number* of dependencies (in-depth),
with **2** http requests.

For more information about this mode please refer to <http://www.extjs.com/forum/showthread.php?t=69161> 

This item is currently in TODO list.  


GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/JooseX-Namespace-Depended/issues>

For general Joose questions you can also visit #joose on irc.freenode.org or the forum at: <http://joose.it/forum>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/JooseX-Namespace-Depended/>

General documentation for Joose: <http://openjsan.org/go/?l=Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/JooseX-Namespace-Depended/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


[authoring]: Depended/Authoring.html


*/
;
