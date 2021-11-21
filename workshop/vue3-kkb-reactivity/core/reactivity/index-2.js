// 发布订阅
// 临时存储
let currentEffect = null;

class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  get value() {
    return this._val;
  }
  set value(newValue) {
    this._val = newValue;
    this.notice();
  }
  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 通知
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

function effectWatch(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// let dep = new Dep(10);
// let b;
// effectWatch(() => {
//   b = dep.value + 10;
//   console.log(b);
// });
// dep.value = 20;
let targetMap = new Map();

function getDep(target, key) {
  let depMap = targetMap.get(target);

  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }
  let dep = depMap.get(key);
  if (!dep) {
    dep = new Dep();
    depMap.set(key, dep);
  }

  return dep;
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      let dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      let dep = getDep(target, key);
      let result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}

const user = reactive({ age: 12 });
let b;
effectWatch(() => {
  console.log('reactive');
  b = user.age;
  console.log(b);
});
user.age = 30;

// let double;
// effectWatch(() => {
//   console.log('reactive');
//   double = user.age;
//   console.log(double);
// });
// user.age = 20;
