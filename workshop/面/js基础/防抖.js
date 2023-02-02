// 节流
// 电梯第一个人进来后，15秒后准时运送一次，这是节流

// 防抖
// 电梯第一个人进来后，等待15秒。如果过程中又有人进来，15秒等待重新计时，直到15秒后开始运送，这是防抖

function debounce(func, wait, immediate) {
	let timeout;
	return function () {
			let context = this;
			let args = arguments;

			if (timeout) clearTimeout(timeout); // timeout 不为null
			if (immediate) {
					let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
					timeout = setTimeout(function () {
							timeout = null;
					}, wait)
					if (callNow) {
							func.apply(context, args)
					}
			}
			else {
					timeout = setTimeout(function () {
							func.apply(context, args)
					}, wait);
			}
	}
}

