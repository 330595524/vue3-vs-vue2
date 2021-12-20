function PromiseAll(promiseArray) {
  // 2. return promise
  return new Promise(function (resolve, reject) {
    //   3.参数类型判断
    if (!Array.isArray(promiseArray)) {
      return reject(new TypeError('aruments must be array '));
      //   return reject(new Error('aruments must be array '));
    }

    const pormiseNum = promiseArray.length;
    const res = [];
    let counter = 0;
    for (let i = 0; i < pormiseNum; i++) {
      // 4. 数组里每一项的类型   Promise.resolve 可以返回一个promise，或者原类型
      Promise.resolve(promiseArray[i])
        .then((value) => {
          // res.push(value)  // 5。 不能用push，会造成返回数据顺序混乱
          res[i] = value;
          console.log(value, 333);
          counter++;
          if (counter === pormiseNum) {
            console.log(344444);
            resolve(res);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}
// // 实例方法
// Promise.prototype.then = function () {};
// // 挂到promise 上，静态方法
// Promise.all = function () {};

const pro1 = new Promise((res, req) => {
  setTimeout(() => {
    res('1');
  }, 1000);
});
const pro2 = new Promise((res, req) => {
  setTimeout(() => {
    res('2');
  }, 2000);
});

let a = PromiseAll([pro1, pro2]);
a.then((aa) => {
  console.log(aa);
});
