function Axios(params) {
    this.intereceptors = {
        request: new intereceptorsManner(),
        response:  new intereceptorsManner()
    }
}

Axios.prototype.request = function () {
    var chain = [dispatchRequest, undefined]
    // dispatchRequest  发请求
    var promise = Promise.resolve()
    this.intereceptors.request.handlers.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled,interceptor.rejected)
    })
    this.intereceptors.response.handlers.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled,interceptor.rejected)
    })
    
    while(chain.length){
        promise  = promise.then(chain.shift(),chain.shift())
    }
    // then函数，return 了什么，就是下一个then的接收值
    return promise
}

function  intereceptorsManner() {
    this.handlers = [];
}   

intereceptorsManner.prototype.use = function (fulfilled,rejected) {
    this.handlers.push(
        fulfilled,
        rejected
    )
}

// Axios.intereceptors.requset.use()
// Axios.intereceptors.response.use()

utils.forEach(['delete','get','head','options'],function (methods) {
    Axios.prototype[methods] = function (url, config) {
        return this.request(utils.merge(config || {},{
            methods: methods,
            url:url
        }))
        
    }
    
})