if (typeof BasicTest1 == 'function' && BasicTest1.meta.constructor == Joose.Meta.Class) throw "Double declaration of BasicTest1";

Class('BasicTest1', {
    VERSION : 0.1,
    
    methods : {
        result : function () { return 1 }
    }
    
})


if (typeof BasicTest2 == 'function' && BasicTest2.meta.constructor == Joose.Meta.Class) throw "Double declaration of BasicTest2";

Class('BasicTest2', {
    VERSION : 0.1,
    
    methods : {
        result : function () { return 2 }
    }
    
})
