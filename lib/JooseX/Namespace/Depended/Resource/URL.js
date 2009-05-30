Class('JooseX.Namespace.Depended.Resource.URL', {
    
    isa : JooseX.Namespace.Depended.Resource,
    
    methods : {
        
        getUrls : function () {
            var url = this.token
            
            if (/^http/.test(url) || /^\//.test(url)) return [ url ]
            
            var urls = []
            
            Joose.A.each(JooseX.Namespace.Depended.Manager.my.INC, function (libroot) {
                urls.push(libroot.replace(/\/$/, '') + url)
            })
            
            return urls
        }
        
    }

})
