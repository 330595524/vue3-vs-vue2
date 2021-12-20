function myNew(fn) {
  const newObj = Object.create(fn.prototype);
  const result = fn.apply(newObj, [...arguments].slice(1));
  return typeof result === 'object' ? result : newObj;
}

function _new(fn,...rest){
    //基于fn的prototype构建对象的原型
    const thisObj = Object.create(fn.prototype);
    //将thisObj作为fn的this，继承其属性，并获取返回结果为result
    const result = fn.apply(thisObj,rest);
    //根据result对象的类型决定返回结果
    return typeof result === "object" ? result : thisObj;
  }

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person('Lee', 21);
const person2 = myNew(Person, 'Lee', 21);
person2.name = 3333;
console.log(person1);
console.log(person2);
