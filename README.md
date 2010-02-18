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

Main documentation page: <http://openjsan.org/go/?l=JooseX.Namespace.Depended>

[Authoring this framework][authoring]

Base resource class: [JooseX.Namespace.Depended.Resource](Depended/Resource.html)

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
