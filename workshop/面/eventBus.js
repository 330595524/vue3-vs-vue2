// eventemitter3
// 这种模式，事件的触发回调之间是同步还是异步的

// const enent = new Event();
// event.on('test', () => console.log(111));
// event.emit('test');
// console.log(333);

class EventEmitter {
  constructor() {
    this.events = {};
  }
  emit(event, ...args) {
    const cbs = this.events[event];
    if (!cbs) {
      console.warn('没有注册事件');
      return this;
    }
    cbs.forEach((cb) => cb.apply(this, args));
    return this;
  }
  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
    return this;
  }
  once(event, cb) {
    const func = (...args) => {
      this.off(event, func);
      cb.apply(this, args);
    };
    this.on(event, func);
  }
  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      // === 可以比较function
      this.enents[event] = this.events[event].filter((item) => item !== cb);
    }
  }
}

const add = (a, b) => console.log(a + b);
const log = (...arg) => console.log(...arg);
const event = new EventEmitter(arguments);
event.on('add', add);
event.on('log', log);
event.emit('add', 1, 2);
event.emit('log', '342432432432');
event.on('off');
