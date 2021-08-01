// 路由入口
let  Vue 
class XRouter {
    static install(_vue){
        Vue = _vue
        Vue.mixin({
            beforeCreate(){
                Vue.prototype.$xlmrouter = 'niha333o呀'
                // 启动路由，当插件加载后启动路由加载
                if (this.$options.router) {
                    this.$options.router.init()
                    Vue.prototype.$xrouter = this.$options.router
                }
            }
        })

    }
    constructor(options) {
        this.$options = options
        this.routerMap = {}
        // 响应式
        this.app = new Vue({
            data:{
                // Mor默认根目录
                current:  '/about'
            }
        })
        
    }
    init(){
        // 启动 在use过程中调用
        this.bindEvents();
        //  处理路由表
        this.createRouterMap()
        // console.log(this.routerMap)
        this.initComponent()
    }
    bindEvents(){
        window.addEventListener('hashchange',this.onHaschange.bind(this),false)
        window.addEventListener('load',this.onHaschange.bind(this),false)
    }
    getHash(){
        return window.location.hash.slice(1) || '/' 
    }
    push(url){
        // has 直接赋值
        // history  pushState
        window.location.hash  = url
    }
    getFrom(e){
      
        let from ,to 
        if(e.newURL){
            from = e.oldURL.split('#')[1]
            to = e.newURL.split('#')[1]
        } else{
            from=''
            to = this.getHash()
        }
        return {
            from,to
        }
    }
    onHaschange(e){
        console.log(e);
        let hash = this.getHash()
        let router =this.routerMap[hash]
        let {from , to } = this.getFrom(e)
        if(router.beforeEnter){
            console.log('you');
            // next 还可以做小扩展，当不通过条件跳转到404
            router.beforeEnter(from, to, ()=>{
                this.app.current = hash
            })
        }else{
            this.app.current = hash
        }

    }
    createRouterMap(){
        // 把数组变成对象
        this.$options.routes.map((item)=>{
            this.routerMap[item.path] = item
        })

    }
    initComponent(){
        // 注册组件
        Vue.component('router-view',{
            render: (h)=>{
                const comp = this.routerMap[this.app.current].component
                return h(comp,{
                    
                })
            }
        })
        // 这样写法需要装 compile  
        // Vue.component('router-link',{
        //     props:{
        //         to:String
        //     },
        //     template: '<a :href=to></slot></a>'
        // })
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                return h('a',{
                    attrs:{
                        href: '#'+this.to
                    }
                },
                [this.$slots.default ]
                )
            }
        })
    }
}
export default XRouter