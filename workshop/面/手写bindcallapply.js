// call
Function.prototype.myCall = function (context) {
  const args = [...arguments].slice(1);
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
// apply
Function.prototype.myApply = function (context) {
  const args = arguments[1] || [];
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
// bind bind 的原理是返回一个函数，这个函数最终使用的参数是创建和执行的参数的集合
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  if (typeof fn !== 'function') {
    throw new TypeError('It must be a function');
  }
  if (!context) context = window;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  };
};
