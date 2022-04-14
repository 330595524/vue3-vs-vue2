class A {
  constructor() {
    this.test = 'constructor';
  }
  print() {
    console.log('A');
  }
}
class B extends A {
  constructor() {
    super();
  }
  prin2t() {
    super.print();
    console.log('B');
  }
}
var b = new B();
A.prototype.name = 'A';
A.prototype.test = 'prototype';
b.prin2t();
//b.name   A
//  b.test constructor
//     b.name? //
//     b.test?

console.log(b.name, b.test);

var arr = [1, 2, 3, 4, 5];
arr.pop();
arr.concat([6, 7]);
arr.push(8);
arr.reverse();
console.log(arr);

var pro = new Promise((res, rej) => {
  res(1);
});
pro.then((res) => {
  console.log(res);
});
console.log(2);
pro
  .then((res) => {
    console.log(res);
    console.log('33222');
  })
  .then((res) => {
    console.log(res);
    console.log('444');
  });
// 2
// 1
