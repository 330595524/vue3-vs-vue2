const render = (key, val) => {
  console.log(key, val);
};
const defineReactive = (obj, key, val) => {
  reactive(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) return;
      val = newVal;
      render(key, val);
    },
  });
};

const reactive = (obj) => {
  if (typeof obj === 'object') {
    for (const key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
};

const data = {
  a: 1,
  b: 1,
  c: {
    c1: {
      af: 1111,
    },
    c2: 5,
  },
};

reactive(data);
data.a = 5;
data.b = 8;
data.c.c2 = 99;
