
			 function getCamelCase(str) {
    var arr = str.split('');  // 每一个字符组成数组
    str = arr.map(function ( item ){
        if( item.toUpperCase() === item ){
            return '-' + item.toLowerCase();
        }else{
            return item;
        }
    }).join( '' );
    return str;
 
}
    console.log(getCamelCase("xiaoShuoWangXiao"))