Class('JooseX.Namespace.Depended.Resource.JooseClass', {
    
    isa : JooseX.Namespace.Depended.Resource.JavaScript,
    
    // NOTE : we don't add the default materialization and transport roles here - they'll be added
    // in one of the Bootstrap/*.js files
    
    after: {
        
        initialize: function () {
            var me = this
            
            this.presence = function () {
                var c = eval(me.token)
                
                return c && c.meta.resource
            }
            
            this.readyness = function () {
                var c = eval(me.token)
                
                return c && c.meta.resource.ready
            }
        }
        
    },
    
    
    methods : {
        
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
        },
        
        
        getUrls : function () {
            var urls = []
            var className = this.token.split('.')
            
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                libroot = libroot.replace(/\/$/, '')
                urls.push( [ libroot ].concat(className).join('/') + '.js' + (JooseX.Namespace.Depended.Manager.my.disableCaching ? '?disableCaching=' + new Date().getTime() : '') )
            })
            
            return urls
        }
    }

})

JooseX.Namespace.Depended.Manager.my.registerResourceClass('joose', JooseX.Namespace.Depended.Resource.JooseClass)