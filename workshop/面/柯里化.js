// function curringAdd(){
// 	let args = [].slice.call(arguments, 0);

//   function add (){
//   	args = [...args,[].slice.call(arguments,0)]
//     return add
//   }

//   add.toString = function (){
//   	return args.reduce((t,a)=>t+a,0)
//   }
//   return add
// }
function curringAdd() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}
let kk = curringAdd(1)(2)(3);
console.log(kk); // 6
console.log(curringAdd(1, 2, 3)(4)); // 10
console.log(curringAdd(1)(2)(3)(4)(5)); // 15
console.log(curringAdd(2, 6)(1)); // 9
console.log(curringAdd(1)); // 1

function add() {
  // 将传入的不定参数转为数组对象
  let args = Array.prototype.slice.call(arguments);

  // 递归：内部函数里面进行自己调用自己
  // 当 add 函数不断调用时，把第 N+1 个括号的参数加入到第 N 个括号的参数里面
  let inner = function () {
    args.push(...arguments);
    return inner;
  };

  inner.toString = function () {
    // args 里的值不断累加
    return args.reduce(function (prev, cur) {
      return prev + cur;
    });
  };

  return inner;
}

// 测试一下
let result = add(1)(2)(3)(4);
console.log(result);
