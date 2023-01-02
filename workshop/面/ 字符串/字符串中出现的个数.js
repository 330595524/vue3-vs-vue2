let str = 'aaabbbccbbbc'
let result = [...str].reduce((res,pre)=>{
 res[pre]?res[pre]++:res[pre] =1 
 return res
},{})
let max =0
let s =0
for (const key in result) {
	if (Object.hasOwnProperty.call(result, key)) {

		const element = result[key];
		console.log(typeof element);
		if( element >=  max ){
			console.log(1111);
			max = element	
			s = key
		}
	}
}
console.log(result);
console.log(max, s);