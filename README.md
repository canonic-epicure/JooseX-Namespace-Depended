Name
====

JooseX.Namespace.Depended - a cross-platform (browser/NodeJS) dependencies handling, integrated with for Joose3 


SYNOPSIS
========

        Class("MyApp.Widget.Header", {
        
            //declare dependencies
            
            use : [ 
                'MyApp.Widget.LoginLine', 
                'MyCompany.Util.Helper'
            ],
            
            does : 'MyApp.Role.Templated',  // dependency in 'does'
            
            
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
            
            isa : { 'MyApp.Widget.Templated' : 0.01 },  // dependency in isa
            
            // or
            
            use : { 
                'MyApp.Widget.LoginLine' : 0.03,
                'MyCompany.Util.Helper' : 0.01 
            }
        })
        
non-Joose code also can be loaded:        

        Class("MyApp.Widget.Header", {
            
            VERSION : 0.11,
        
            use : {
                token       : 'http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js',
                
                presence    : 'Ext' // skip load if `Ext` evalutes to true
            }
        })
        
load from code:

        use({ 'MyApp' : 0.01 }, function () {
            
            MyApp.run()
        })


DOCUMENTATION
=============

Please refer to: <http://samuraijack.github.com/JooseX-Namespace-Depended>


AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2010, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
