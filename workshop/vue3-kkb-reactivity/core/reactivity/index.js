// 响应式库
let currentEffect = null;
class Dep {
  // 收集依赖
  constructor(val) {
    this.effects = new Set(); // vue3使用的WeakMap
    this._val = val;
  }

  get value() {
    return this._val;
  }
  set value(newVal) {
    this._val = newVal;
    this.notice();
  }

  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }

  // 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}

export function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect;
  effect();
  currentEffect = null;
}

// ref 很像
// const dep = new Dep(10);

// let b;
// effectWatch(() => {
//   b = dep.value + 10;
//   console.log(b);
// });
// dep.value = 20;

const targetMap = new Map();

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

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      console.log(target, key, '9999');
      // key -dep
      // dep 在那存储

      const dep = getDep(target, key);
      dep.depend();

      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}

// const user = reactive({
//   age: 12,
//   name: 333,
// });
// user.age;

// let double;
// effectWatch(() => {
//   console.log('reactive');
//   double = user.age;
//   console.log(double);
// });
// user.age = 20;
