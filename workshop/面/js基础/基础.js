var myname = '小明';
function showName() {
  console.log(myname); // undefined
  if (0) {
    var myname = '小红';
  }
  console.log(myname); // undefined
}
// showName();

// 222
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;
    console.log(x); // 2
  }
  console.log(x); // 1
}
// letTest();

// 33
function bar() {
  console.log(myName);
}
function foo() {
  var myName = '腾讯1';
  bar();
}
var myName = '腾讯2';
foo(); // 腾讯2
// 箭头函数:
var foo = () => () => {
  console.log(myName);
};

// 4. 请写出下面代码输出结果以及原因
var myObj = {
  name: '腾讯1',
  showThis: function () {
    console.log(this);
    var self = this;
    function bar() {
      self.name = '腾讯2';
    }
    bar();
  },
};
myObj.showThis(); // myObject对象 
console.log(myObj.name); // 腾讯2 
console.log(window.name); // undefined
