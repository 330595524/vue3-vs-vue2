function decorptor(dom,fn){
    var fn  = fn || function () {}
   if(typeof dom.onClick === 'function'){
        var _old = dom.onClick

        dom.onClick = function () {
            _old.apply(this, arguments)
            fn.apply(this, arguments)
        }
   }
}
decorptor(confirm,function(){
    console.log('操作成功')
})

// 源码里  例子 vue
var arr = ['push','pop','shift']
var arrPro = Array.prototype
var copyPro = Object.create(arrPro)
arr.forEach((method)=>{
    copyPro[method] = function () {
        var _old = arrPro[method];
        var _result = _old.apply(this)
        dep.notify();
    }
})