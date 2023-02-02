// a->b
// a-> 观察-> b

//  写一个抽奖转盘，越转月快，越慢
//  初始化转盘，，html ， 转一圈快一点，然后终止
//  初始化html, 转动控制模块，转动效果setInterval() ,最终结果    {moveTime:10,speed:200}
// 观察者

function observe(params) {
    this.message={}
}

observe.prototype.regist = function (type,fn) {
    this.messagep[type] = fn
}
observe.prototype.fire = function (type) {
    this.message[type]();
}

var observeOb = new observe() // 实例化

var _domArr = []
function HtmlInit() {
    for (let index = 0; index < 9; index++) {
        let _div = document.createElement('div');
        _div.setAttribute('class','item');
        _domArr.push(_div);
    }
}
function getFinal() {
    var _num = Math.random*10+40;
    return Math.floor(_num,0)
}

function mover(moveConfig) {
    var nowIN = 0;
    var removerNum = 9;
    var timer = setInterval(()=>{
        // 享元
        if(nowIN!=0){
            removerNum = nowIN -1 
        }
        _domArr[removerNum].setAttribute('class','item')
        _domArr[nowIN].setAttribute('class','item item-on')
        nowIN++

        if(nowIN === moveConfig.moveTime){
            clearInterval(timer)
            observeOb.fire('finish')
        }

        // if(nowIN == 0){
        //     _domArr[9].setAttribute('class','item')
        //     _domArr[nowIN].setAttribute('class','item item-on')
        // }else{
        //     _domArr[--nowIN].setAttribute('class','item')
        //     _domArr[nowIN].setAttribute('class','item item-on')
        // }
    },moveConfig.speed)

}
function moverControll() {
    var finail = getFinal()
    var _circle = Math.floor(finail/10,0)
    var _runCircle= 0;
    var stopNum = finail%10;
    var _speed =200;
    mover({
        moveTime:10,
        speed:_speed
    })
    observeOb.regist('finish',function () {
        var _time = 0;
        _speed -=50;
        _runCircle++;
        if(_runCircle<=_circle){
            _time = stopNum;
        }else{
            _time = stopNum
        }
        mover({
            moveTime: _time,
            speed: _speed,
        })
    })
}