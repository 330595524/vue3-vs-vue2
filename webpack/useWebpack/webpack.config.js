const path = require('path');
module.exports = {
 entry:'./src/index.js',
 output:{
	//  path 取绝对路径
	path: path.resolve(__dirname,"./build"), 
	filename:'main.js',

 }
}