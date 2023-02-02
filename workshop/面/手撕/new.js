/*
警告: 通过现代浏览器的操作属性的便利性，
可以改变一个对象的 [[Prototype]] 属性,
这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，
使用这种方式来改变和继承属性是对性能影响非常严重的，
并且性能消耗的时间也不是简单的花费在
obj.__proto__ = ... 语句上, 它还会影响到所有继承来自该 [[Prototype]] 的对象，
如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]。相反,
创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 Object.create()
*/
function new_obj() {
  let obj = new Object();
  let fn = Array.prototype.shift.call(arguments);
  obj.__proto__ = fn.prototype;
  const result = fn.apply(obj, arguments);
  return typeof result === 'object' ? result : obj;
}

function new_obj2(fn, ...arg) {
  let obj = Object.create(fn.prototype);
  const result = fn.apply(obj, arg);
  return result instanceof Object ? result : obj;
}

function nwe(fn, ...arg) {
  let obj = Object.create(fn.prototype)
  const result = fn.apply(obj, arg)
  return result instanceof 'object' ? result : obj

}
