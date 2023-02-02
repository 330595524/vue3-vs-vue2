function moveDiv(params) {
    if (arguments.length ==1) {
        if(arguments[0]==='left'){
            moveLeft()
        }else if(arguments[0]==='top'){
            moveRight()
        }
    }else if(arguments.length ==2){
        if (arguments[0] ==='left'&&arguments[1]=='top') {
            moveLeft()
            moveRight()
        }
    }
}
moveDiv('left','top')



// 状态模式
function moveDiv(params) {
   this.stateArr = [];
   this.catorObjeact  ={
       left: moveLeft,
       top: moveTop,
       right: moveRight,
   }
}
moveDiv.prototype.run = function(){
    this.stateArr=Array.prototype.slice.call(arguments);
    this.stateArr.forEach((item)=>{
        this.catorObjeact[item]()
    })
}

moveDiv.run('left','top')