/**
 * Created: xulimin
 * Date: 2023-01-29
 */
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

  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      // === 可以比较function
      this.enents[event] = this.events[event].filter((item) => item !== cb);
    }
  }
}

class eventBus {
  construct() {
    this.events = {}
  }

  emit(eventKey, ...args) {
    const cbs = this.events[eventKey]
    if (!cbs) return this

    cbs.forEach((item) => item.apply(this, args))
  }

  on(eventKey, cb) {
    if (!cb){
      this.events[eventKey]= [];
    }else {
      this.events[eventKey].push(cb)
    }
    return this;
  }

  off(eventKey , cb) {
    if (!cb) {
      this.events[eventKey] = null;
    }else {
      this.events[eventKey] = this.events[eventKey].filter(item => item !== cb)
    }
  }

  once(event, cb) {
    const fn = (...args) =>{
      this.off(event, fn)
      cb.apply(this,args);
    }
    this.on(event, fn)

  }

}

// 防抖

function fatle(fn, timer = 0) {
  return function () {
    let t = setTimeout(() => {
      fn()
    }, timer)
    if (t) {

    }
  }

}

function setbu(fn, timer = 0) {

  return function (t) {

    if (!t) {
      t = setTimeout(() => {
        fn()
      }, timer)
    }
    return setTimeout(() => {
      fn()
    }, timer)
  }

}




// 函数防抖
function debounce(fn, wait = 50) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },wait)
  }
}


// 节流
function throttle(func, wait) {
  let timer;
  return function(...args) {
    let context = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args)
      }, wait)
    }
  }
}

function handle(){
  console.log(Math.random());
}

window.addEventListener("mousemove",debounce(handle,1000));























