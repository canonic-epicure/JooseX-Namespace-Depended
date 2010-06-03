Class('JooseX.Namespace.Depended.Manager', {
    
    my : {
    
        have : {
            
            INC                             : Joose.is_NodeJS ? require.paths : [ 'lib', '/jsan' ],
            
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
                
                resource.attachedTo     = me
                resource.loaded         = true
                resource.loading        = false
                
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
                var nsManager   = Joose.Namespace.Manager.my
                var global      = nsManager.global
                
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


Joose.I.FutureClass = function (className) { return function () { return eval(className) } }


/**

Name
====


JooseX.Namespace.Depended.Manager - A global collection of all resources


SYNOPSIS
========

        JooseX.Namespace.Depended.Manager.my.registerResourceClass('custom-type', JooseX.Namespace.Depended.Resource.Custom)
        

DESCRIPTION
===========

`JooseX.Namespace.Depended.Manager` is a global collection of all resources. 

**Note:** Its a pure [static](http://openjsan.org/go?l=Joose.Manual.Static) class - all its methods and properties are static.


METHODS
=======

### registerResourceClass

> `void registerResourceClass(String type, Class constructor)`

> After you've created your custom resource class, you need to register it with call to this method.

> Then you can refer to new resources with the following descriptors: 

                {
                    type    : 'custom-type',
                    token   : 'some-token'
                }



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/JooseX-Namespace-Depended-Manager/issues>

For general Joose questions you can also visit #joose on irc.freenode.org or the forum at: [http://joose.it/forum](http://joose.it/forum)
 


SEE ALSO
========

Authoring [JooseX.Namespace.Depended](Authoring.html)

Abstract base resource class: [JooseX.Namespace.Depended.Resource](Resource.html)

General documentation for Joose: <http://openjsan.org/go/?l=Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/JooseX-Namespace-Depended-Manager/issues](http://github.com/SamuraiJack/JooseX-Namespace-Depended-Manager/issues)



AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
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
        
        loadedFromURL       : null,
        
        readyListeners      : Joose.I.Array,
        
        dependencies        : Joose.I.Object,
        
        onBeforeReady       : { is : 'rw', init : null },
        readyDelegated      : false,
        
        version             : { is : 'rw', init : null },
        requiredVersion     : { is : 'rw', init : null },
        
        hasReadyCheckScheduled  : false
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
            if (this.dependencies[ resource.id ] || resource.isReady()) return
            
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
            if (!Joose.O.isEmpty(this.dependencies) || this.hasReadyCheckScheduled) return
            
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
            
            var listeners = this.readyListeners
            
            this.readyListeners = []
            
            Joose.A.each(listeners, function (listener) {
                listener()
            })
        },
        
        
        isReady : function () {
            return this.ready
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

            // this delays the 'checkReady' until the resourse will be *fully* materialized
            // *fully* means that even the main class of the resource is already "ready"
            // the possible other classes in the same file could be not
            // see 110_several_classes_in_file.t.js, 120_script_tag_transport.t.js for example
            me.hasReadyCheckScheduled = true
            
            var onsuccess = function (resourceBlob, url) {
                me.loaded = true
                me.loading = false
                
                me.loadedFromURL = url
                
                me.materialize(resourceBlob, url)
                
                me.hasReadyCheckScheduled = false
                
                
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
        
        
        load : function (url, onsuccess, onerror) {
            throw "Abstract resource method 'load' was called"
        },
        
        
        materialize : function (resourceBlob) {
            throw "Abstract resource method 'materialize' was called"
        }
        
    }
})


/**

Name
====


JooseX.Namespace.Depended.Resource - Abstract resource class 


SYNOPSIS
========
        
        //mostly for subclassing only
        Class("JooseX.Namespace.Depended.Resource.JooseClass", {
        
            isa : JooseX.Namespace.Depended.Resource,
            
            ...
        })


DESCRIPTION
===========

`JooseX.Namespace.Depended.Resource` is an abstract resource class. Its not supposed to be used directly, instead you should use
one of its subclasses.


ATTRIBUTES
==========

### attachedTo

> `Object attachedTo`

> An arbitrary object to which this resource is attached (its a corresponding class in JooseX.Namespace.Depended)


### type

> `String type`

> A type of resource  - plain string. `JooseX.Namespace.Depended.Manager` maintain a collection of resource types, accessible 


### token

> `String token`

> A token of resource  - plain string with arbitrary semantic. Each subclass should provide this semantic along with `token -> url` conertion method (locator)  


### id

> `String id`

> An id of resource - is computed as `type + '://' + token'


### loading

> `Boolean loading`

> A sign whether this resource is currently loading

  
### loaded

> `Boolean loaded`

> A sign whether this resource is already loaded


### ready

> `Boolean ready`

> A sign whether this resource is considered ready. Resource is ready, when its loaded, and all its dependencies are ready.


### loadedFromURL

> `String loadedFromURL`

> An url, from which the resource was loaded.


### readyListeners

> `Array[Function] readyListeners`

> An array of functions, which will be called after this resource becomes ready. Functions will be called sequentially. 


### dependencies

> `Object dependencies`

> An object containing the dependencies of this resource. Keys are the `id`s of resources and the values - the resource instances itself.

 
### onBeforeReady

> `Function onBeforeReady`

> A function, which will be called, right after the all dependencies of the resource became ready, but before its own `readyListeners` will be called.
It supposed to perform any needed additional actions to post-process the loaded resource.

> Function will receive two arguments - the 1st is the callback, which should be called when `onBeforeReady` will finish its work. 2nd is the resource instance.

  
### version

> `r/w Number version`

> A version of this resource. Currently is handled as Number, this may change in future releases.

  
### requiredVersion

> `r/w Number requiredVersion`

> A *requiredVersion* version of this resource. Required here means the maximum version from all references to this resource. 



METHODS
=======

### addDescriptor

> `void addDescriptor(Object|String descriptor)`

> Add the resource, described with passed descriptor as the dependency for this resource.


### getUrls

> `String|Array[String] getUrls()`

> Abstract method, will throw an exception if not overriden. It should return the array of urls (or a single url) from which this resource can be potentially loaded. 
This method should take into account the `JooseX.Namespace.Depended.Manager.my.INC` setting


### load

> `void load(String url, Function onsuccess, Function onerror)`

> Abstract method, will throw an exception if not overriden. It should load the content of the resource from the passed `url`. If there was an error during loading
(for example file not found) should not throw the exception. Instead, should call the `onerror` continuation with it (exception instance).

> After successfull loading, should call the `onsuccess` continuation with the resource content as 1st argument, and `url` as 2nd: `onsuccess(text, url)`


### materialize

> `void materialize(String resourceBlob, String url)`

> Abstract method, will throw an exception if not overriden. It should "materialize" the resource. The concrete semantic of this action is determined by resource nature.
For example this method can create some tag in the DOM tree, or execute the code or something else.

> Currently this method is supposed to operate synchronously, this may change in future releases. 
 

SEE ALSO
========

Web page of this package: <http://github.com/SamuraiJack/JooseX-Namespace-Depended-Resource/>

General documentation for Joose: <http://openjsan.org/go/?l=Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/JooseX-Namespace-Depended-Resource/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009-2010, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
;
Role('JooseX.Namespace.Depended.Materialize.Eval', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob) {
            eval.call(Joose.top, resourceBlob)
        }
    }
})

/**

Name
====


JooseX.Namespace.Depended.Materialize.Eval - materializator, which treat the resource content as JavaScript code, and use `eval` function to evalute it 


SYNOPSIS
========
        
        //generally for consuming only
        
        Class("JooseX.Namespace.Depended.Resource.Custom", {
        
            isa : JooseX.Namespace.Depended.Resource,
            
            does : [ JooseX.Namespace.Depended.Materialize.Eval, ...]
            
            ...
        })


DESCRIPTION
===========

`JooseX.Namespace.Depended.Materialize.Eval` is a materializator role. It provide the implementation of `materialize` method. 


SEE ALSO
========

Authoring [JooseX.Namespace.Depended](../Authoring.html)

Abstract base resource class: [JooseX.Namespace.Depended.Resource](../Resource.html)


General documentation for Joose: <http://openjsan.org/go/?l=Joose>


AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009-2010, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/;
Class('JooseX.Namespace.Depended.Resource.JooseClass', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    // NOTE : we don't add the default materialization and transport roles here - they'll be added
    // in one of the Bootstrap/*.js files
    
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
        },
        
        
        isReady : function () {
            return this.isLoaded()
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('nonjoose', JooseX.Namespace.Depended.Resource.NonJoose)
;
Role('JooseX.Namespace.Depended.Transport.NodeJS', {

    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onsuccess, onerror) {
            var fs = require('fs')
            
            fs.readFile(url, function (err, data) {
                if (err) {
                    onerror(err)
                    
                    return
                }
                
                onsuccess(data, url)
            })            
        }
    }
})


/**

Name
====


JooseX.Namespace.Depended.Transport.Node - transport, which use the `fs.readFile()` call of NodeJS, to load the content of resource. 


SYNOPSIS
========
        
        //generally for consuming only
        
        Class("JooseX.Namespace.Depended.Resource.Custom", {
        
            isa : JooseX.Namespace.Depended.Resource,
            
            does : [ JooseX.Namespace.Depended.Transport.Node, ...]
            
            ...
        })


DESCRIPTION
===========

`JooseX.Namespace.Depended.Transport.Node` is a transport role. It provide the implementation of `load` method, 
which use the `fs.readFile()` call of NodeJS for resource loading. 



SEE ALSO
========

Authoring [JooseX.Namespace.Depended](../Authoring.html)

Abstract base resource class: [JooseX.Namespace.Depended.Resource](../Resource.html)


General documentation for Joose: <http://openjsan.org/go/?l=Joose>


AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009-2010, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/;
Role('JooseX.Namespace.Depended.Materialize.NodeJS', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        materialize : function (resourceBlob, url) {
            process.binding('evals').Script.runInThisContext(resourceBlob, url)
        }
    }
})

/**

Name
====


JooseX.Namespace.Depended.Materialize.NodeJS - materializator, which execute the code, using the `Script.runInThisContext` call of NodeJS. 


SYNOPSIS
========
        
        //generally for consuming only
        
        Class("JooseX.Namespace.Depended.Resource.Custom", {
        
            isa : JooseX.Namespace.Depended.Resource,
            
            does : [ JooseX.Namespace.Depended.Materialize.NodeJS, ...]
            
            ...
        })


DESCRIPTION
===========

`JooseX.Namespace.Depended.Materialize.NodeJS` is a materializator role. It provide the implementation of `materialize` method. 


SEE ALSO
========

Authoring [JooseX.Namespace.Depended](../Authoring.html)

Abstract base resource class: [JooseX.Namespace.Depended.Resource](../Resource.html)


General documentation for Joose: <http://openjsan.org/go/?l=Joose>


AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009-2010, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/;
Class('JooseX.Namespace.Depended.Resource.Require', {
    
    isa     : JooseX.Namespace.Depended.Resource.JooseClass,
    
    
    methods : {
        
        getUrls : function () {
            return [ this.token ]
        },
        
        
        load: function (url, onsuccess, onerror) {
            
            require.async(url, function (err) {
                if (err instanceof Error) 
                    onerror(err)
                else
                    onsuccess('', url)
            })
            
        },

        
        materialize : function () {
        }
        
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('require', JooseX.Namespace.Depended.Resource.Require)
;
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
                
                this.collectDependencies(extend[propName], summaredDeps, extend, propName)
                    
                if (extendMy && extendMy[propName]) this.collectDependencies(extendMy[propName], summaredDeps, extendMy, propName)
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
            
            
            //skip constructing for classes w/o dependencies 
            if (Joose.O.isEmpty(resource.dependencies)) {
                this.inlineDependencies(extend)
                
                var res = this.SUPER(name, extend, defaultMeta, callback)
                
                //this will allow to classes which don't have dependencies to be ready synchronously
                resource.checkReady()
                
                return res
            } else {
                // defer the dependencies loading, because they actually could be provided later in the same bundle file
                // this, however, affect performance, so bundles should be created in the dependencies-ordered way
                setTimeout(function () {
                    resource.handleDependencies()
                }, 0)
                
                // debugging warning
                if (typeof ENABLE_DEFERRED_DEPS_WARNING != 'undefined')
                    console.log('Deferred deps handling for class [' + name + '], deps = [' + JSON.stringify(resource.dependencies) + ']')
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
        
        
        collectDependencies : function (from, to, extend, propName) {
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
});
JooseX.Namespace.Depended.Resource.JooseClass.meta.extend({
    
    does : [ JooseX.Namespace.Depended.Transport.NodeJS, JooseX.Namespace.Depended.Materialize.NodeJS ]
})


JooseX.Namespace.Depended.Manager.my.disableCaching = false

Joose.Namespace.Manager.my.containResources.unshift('require')



JooseX.Namespace.Depended.meta.extend({
    
    override : {
        
        collectDependencies : function (from, to, extend, propName) {
            if (propName != 'require') return this.SUPERARG(arguments)
            
            if (!from) return
            
            Joose.A.each(Joose.O.wantArray(from), function (url) {
                to.push({
                    type    : 'require',
                    token   : url
                })
            })
            
            delete extend.require
        }
    }
})
;