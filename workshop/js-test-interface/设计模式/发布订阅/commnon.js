var Observer  = {
	_message:{},
	regist:function(type,fn){
		// 订阅消息
		if(!this._message[type]){
			this._message[type] = [fn];
		}else{
			this._message[type].push(fn);
		}
	},
	fire:function (type) {
		// 触发
		var len = this._message[type].length;
		for (var i=0;i<len;i++) {
			this._message[type][i].call(this);
		}
	},
	remove:function(type){
		var len = this._message[type].length-1;
		for (var i =len; i>=0;i--) {
			this._message[type][i] = this._message[type].splice(i,1);
		}
	},
	
}



var timer;


function init () {
	function _init () {
		
	}
	
	Observer.regist('runOver',function () {
		timer +=10;
		runner('stop')
		runner('run')
	})
	
	
	function runner (command) {
		console.log(Observer)
		console.log(command)
		console.log('11111')
		
	}
	
	function runcontroll () {
		Observer.fire('runOver')
	}
	runcontroll();
}
init();