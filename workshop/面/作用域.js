var a = 10;
(function () { 
    console.log(a)
    a=5 
    console.log(window.a) 
    var a = 20; 
    console.log(a)
})()

// undefined
//  10
// 20
var obj = { '2': 3, '3': 4,
'length': 2,
'splice': Array.prototype.splice,
'push': Array.prototype.push};
obj.push(1);
obj.push(2);
console.log(obj);