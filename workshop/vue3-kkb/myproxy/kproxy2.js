





let activeEffect

class Dep {
    subs = new Set()
    depend() {
        // 收集依赖
        if (activeEffect) {
            this.subs.add(activeEffect)
        }
    }
    notify() {
        // 数据变化，触发effect执行
        console.log(this.subs);
        this.subs.forEach(effect => effect())
    }
}

const dep = new Dep();


function effect(fn) {
    activeEffect = fn;
    fn();
}


function ref(val) {
    let _value = val
    // 拦截ref函数实现，
    let state = {
        get value() {
            // 获取值的时候，收集依赖
            dep.depend()
            return _value
        },
        set value(newCount) {
            // 修改 通知dep 执行有这个依赖的effect 函数
            _value = newCount
            dep.notify()
        }
    }
    return state
}
const state = ref(0);

/*
// 拦截ref函数实现，
let state ={
    get value(){
        // 获取值的时候，收集依赖
        dep.depend()
        return _value
    },
    set value(newCount){
        // 修改 通知dep 执行有这个依赖的effect 函数
        _value = newCount
        dep.notify()
    }
}
*/

effect(() => {
    // 依赖收集,依赖的变化
    console.log(state.value)
})
setInterval(() => {
    state.value++
}, 1000)


