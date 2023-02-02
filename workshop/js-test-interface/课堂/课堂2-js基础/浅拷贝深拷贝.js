function deploy(obj) {
    var result = Array.isArray(obj)?[]:{};
    if(obj && typeof obj === 'object'){
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                
                if(obj[key]&& typeof obj[key] ==='object'){
                    result[key] = deploy(obj[key]);
                }else{
                    result[key] = obj[key];
                }
            }
        }
    }
    
   return result;
}

var objstart = {
    name:'xiaoming',
    age:12,
    say:function (params) {
        
    },
    work:undefined,
    home:{
        child:123
    }
}
var obj2 = deploy(objstart);
obj2.name = 'hahhaha';
obj2.home.child = 'hahhaha2222';
console.log(objstart);
console.log(obj2);

let obj = {};
obj.name = '班班开心';

console.log(obj.hasOwnProperty('name'));// 非继承