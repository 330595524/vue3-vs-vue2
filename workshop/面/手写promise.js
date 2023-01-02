
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
class MyPromise {
    constructor(fn) {
        this.state = PENDING
        this.resolvedHandles = []
        this.rejectedHandles = []
        fn(this.resolvedHandles.bind(this),this.reject.bind(this))
        return this
    }
    resolve(props){
        setTimeout(()=>{
         this.state = RESOLVED
         const resolveHandler = this.resolvedHandles.shift();
         if (!resolveHandler) {
            return
         }   
         const result = resolveHandler(props);
         if(result && result instanceof MyPromise){
             result.then(...this.resolvedHandles)
         }
        })
    }

    reject(error){
        setTimeout(()=>{
            this.state = REJECTED
            const rejectHandle = this.rejectedHandles.shift()
            if(!rejectHandle) return
            const result = rejectHandle(error)
            if(result && result instanceof MyPromise){
                result.catch(...this.rejectedHandles)
            }
        })
    }

    then(...handlers){
        this.resolvedHandles = [...this.resolvedHandles, ...headers]
        return this
    }

    catch(...handlers){
        this.rejectedHandles = [...this.rejectedHandles, ...handlers]
        return this
    }
}

MyPromise.all = function (promises) {
    return new MyPromise((resolve,reject)=>{
        const results = [];
        for (let i = 0; i < promises.length; i++) {
            const promise = promises[i];
            promise.then((res)=>{
                results.push(res)
                if (results.length ===promises.length) {
                    resolve(results)
                }
            }).catch(reject)
            
        }
    })
}

MyPromise.race = function (promises) {
    return new MyPromise((resolve,reject)=>{
        for (let i = 0; i < promises.length; i++) {
            const promise = promises[i];
            promise.then(resolve).catch(reject)
        }
    })
    
}







