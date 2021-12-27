const render = (action, ...args) => {
  console.log(`acton = ${action}`, args.join(','));
};

const arrPrototype = Array.prototype; // 备份
const newArrP = Object.create(arrPrototype);

['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(
  (methodName) => {
    newArrP[methodName] = function () {
      // 执行原有数组方法
      arrPrototype[methodName].call(this, ...arguments);
      render(methodName, ...arguments);
    };
  }
);

const reactive = (obj) => {
  if (Array.isArray(obj)) {
    // 把新定义的原型对象指向，obj.__proto__
    obj.__proto__ = newArrP;
  }
};
const data = [1, 2, 3, 4];
reactive(data);
data.push(5);
data.splice(0, 2);
