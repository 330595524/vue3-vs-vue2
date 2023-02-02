import serive from './servie.js'
import server from './server.js'

function myserver(params) {
    this.serive = seriver
    this.nowHandle= null
}

myserver.prototype.parseRouter = function (name, urlOb) {
    var ob = this[name] = {}
    Object.keys(urlOb).forEach((item)=>{
        ob[item] = this.sendMes.bind(this, name, item, urlOb[item])
    })
    // 不用关心 api是什么
    // 封装库，给你最简单的方式，也给你最大的扩展空间
    // 最简单的思路，你要求，我就用你要求的，你不要求，就用默认
    // 请求回来自动绑定到data
    //  .vue 文件是一个对象，是一个引用类型
}

myserver.prototype.v = function (vueObj) {
    if(vueObj instanceof vue){
        this.nowHandle = vueObj
    }
    return this;
}

myserver.prototype.sendMes = function (mouduleName,name,url,config) {

    var config = config || {}
    var type = config.type|| 'get'
    var data = config.data || {}
    var self =  this;
    var bindName = config.bindName || name
// 请求处理前、请求处理后
    var before = function (mes) {
        
    }

    var defaultFn =function (){
        self.nowHandle[bindName] = function (mes){
            self.nowHandle[bindName] = mes.data
        }
    }

    var success = config.success || defaultFn
    var callback = function (res){
        success(rees, defaultFn)
    }

    var state = {
        get :function () {
            var urlqs = url + '?' + qs.stringify(data)
            service.get(urlqs).then(before).then(callback)
        },
        set :function () {
            service.post(url,data).then(before).then(callback)
        }
    }
    
}
export default new myserver