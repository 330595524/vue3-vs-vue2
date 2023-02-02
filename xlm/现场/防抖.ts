declare type FN = (...args: Array<any>) => void

export function debounce(fn: FN, delay: number = 300) {
  let I: any = null
  return (...args: Array<any>) => {
    I && clearTimeout(I)
    I = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

declare type  Fn = (...args: Array<any>) => void

// 防抖
function debounce2(fn: Fn, delay: number = 300) {
  let I: any = null
  return (...args: Array<any>) => {
    I && clearTimeout(I)
    I = setTimeout(() => {
      fn(args)
    }, delay)
  }
}

// 节流
function throttle(fn: Fn, delay: number = 300) {
  let I: any = null;
  return (...args: Array<any>) => {
    if (!I) {
      let context = this;
      I = setTimeout(() => {
        I = null;
        fn.apply(context, args)
      }, delay)
    }
  }

}

//函数防抖 :如果一个事件被频繁执行多次，并且触发的时间间隔过短，则防抖函数可以使得对应的事件处理函数，只执行最后触发的一次。函数防抖可以把多个顺序的调用合并成一次。
// 函数防抖场景： 1、输入搜索框（只需要最后一次输入完成后再放松Ajax请求）
//             2、滚动事件，
//             3、文本输入的验证（连续输入文字后发送Ajax请求进行验证，停止输入后验证一次）
// 函数节流 :如果一个事件被频繁触发多次，节流函数可以按照固定的频率去执行相应的事件处理方法。函数节流保证一个事件一定事件内只能执行一次。



