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
        

DESCRIPTION
===========

`JooseX.Namespace.Depended` is a dependencies handling framework, tightly integrated with Joose3. 

It allows you to refer to other (not yet loaded) classes/roles in your class declaration. 

Framework is highly customizable, additional resources/transport/materialization modes can be easily added.
Please refer to [JooseX.Namespace.Depended.Authoring][authoring] for more information. 

By default, framework operates in asynchronous mode, using XHR requests for transport and `eval` for "materialization".


CURRENT DEVELOPMENT STATUS
==========================

This framework is considered stable and thoroughly tested (more than 300 unit tests, including stress-test). 
The use case for "pure" Joose classes will be supported without breaking changes. 

However, at this stage, the syntax for loading *non Joose* code may be changed *any time*, without prior notice. 


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

In general case, the dependency descriptor is an object with following structure:
        
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
    
Also in any other custom builder (some [authoring][authoring] required) 

The framework will scan class declaration for dependencies, pre-load them, then substitute descriptors with actual classes and continue the declaration process.


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
