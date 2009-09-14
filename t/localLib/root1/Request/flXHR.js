Class('Request.flXHR', {
    
    BEGIN : function (ready, resource) {
        Request.flXHR.beginCount = Request.flXHR.beginCount || 0
        
        Request.flXHR.beginCount++
        
        ready()
    }
    
})
