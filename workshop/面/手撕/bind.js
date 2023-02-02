// 简单
Function.prototype.myBind = function (context, ...args) {
  /* const fn = this;
  if (typeof fn !== 'function') {
    throw new TypeError('It must be a function');
  }
  if (!context) context = window;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  }; */
  const fn = this;
  if (typeof fn !== 'function') {
    throw new TypeError('1111');
  }
  if (!context) {
    context = window;
  }
  return function (...otherArgs) {
    fn.apply(context, [...args, ...otherArgs]);
  };
};
function kkkb() {
  console.log(this.name);
}
let obj = {
  name: 123,
};
let kk = kkkb.myBind(obj);
kk();
// console.log(kk.name);


Function.prototype.myBind2 = function (ctx, ...args) {
  const fn = this;
  if(typeof fn !== 'function') {throw new TypeError("类型错误")}
  if (!ctx) ctx = window
  return function (...otherArgs) {
      fn.apply(ctx, [...args, ...otherArgs])
  }
}
