$.extend({a:1})
$.extend({a:1,b:2})


/* $.extend = function(){
    if(arguments.length ===1 ){
        for (const key in arguments[0]) {
            this[key]=arguments[0][key]
        }
    }else
    {
        for (const key in arguments[1]) {
            arguments[0][key]=arguments[1][key]
        } 
    }
} */


$.extend = function(){
    var source = argumentsp[0];
    var target = this;
    if(arguments.length ===2){
        var source = argumentsp[1];
        var target = argumentsp[0];
    }
    for (const key in source) {
        target[key]=source[key]
    } 
}

