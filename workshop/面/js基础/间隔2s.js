function A(name) {
  this.name = name;
}
A.prototype.log = function () {
  //每隔2s输出一下name
  setInterval(() => {
    console.log(this.name);
  }, 2000);
};

let kk = new A('123');
// kk.log();

var dis =0;
function animation(){
  requestAnimationFrame(function(){
      div.style.left = ++dis;
      if(disx<50) animation();
  })  
}
animation();