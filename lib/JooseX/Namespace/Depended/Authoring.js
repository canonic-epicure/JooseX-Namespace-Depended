/**

Name
====


JooseX.Namespace.Depended.Authoring - authoring JooseX.Namespace.Depended 


SYNOPSIS
========

        Role('JooseX.Namespace.Depended.Transport.Custom', {
            
            requires : [ 'handleLoad' ],
            
            override : {
                
                load: function (url, onsuccess, onerror) {
                
                    var text = // somehow load the content of file from 'url' passed
                    
                    // if there were an error during that process - don't throw any exceptions,
                    // instead call the 'onerror' with the exception as 1st argument

                    // if the loading was successfull - call the 'onsuccess' as:  onsuccess(text, url)
                }
            }
        })


        Role('JooseX.Namespace.Depended.Materialize.Custom', {
            
            requires : [ 'handleLoad' ],
            
            materialize : function (blob) {
                // somehow materialize the passed blob (generally content of resource file)
                // can be "eval" or <script> tag for code
                // or for example <style> tag for css
            }
        })
        
        
        Class('JooseX.Namespace.Depended.Resource.Custom', {
            
            isa : JooseX.Namespace.Depended.Resource,
            
            does : [ JooseX.Namespace.Depended.Transport.Custom, JooseX.Namespace.Depended.Materialize.Custom ],
            
            
            getUrls : function () {
                //provide 'getUrls' implementation
            }
            
        })


DESCRIPTION
===========

First, examine the interface of the abstract resource class: [JooseX.Namespace.Depended.Resource][resource]

As you may noticed, there are 3 abstract methods, which generally determines the behavior of resource: `getUrls`, `load` and `materialize`.

They corresponds

Framework implements pluggable transports (currently implemented: XHR, &lt;script&gt; tag), pluggable "materialization"
(currently implemented: "eval") and custom resource types (currently implemented: "Joose class" and "arbitrary JavaScript code (non Joose)"). 



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/JooseX-Namespace-Depended/issues>

For any questions you can also visit #joose on irc.freenode.org or the forum at: <http://joose.it/forum>


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


[resource]: Resource.html

*/
