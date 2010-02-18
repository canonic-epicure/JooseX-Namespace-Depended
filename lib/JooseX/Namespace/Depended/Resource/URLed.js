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
