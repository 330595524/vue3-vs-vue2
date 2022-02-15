let arr = [85, 24, 63, 45, 17, 31, 96, 50]
var quickSort = function(arr) {
	if (arr.length<=1) return arr
	let midIndex = Math.floor(arr.length/2)
	let pivot = arr.splice(midIndex,1)[0];
	let left = [],right=[];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if(item<pivot){
			left.push(item)
		}else{
			right.push(item)
		}
	}

	return quickSort(left).concat([pivot],quickSort(right))
};
let kk =quickSort(arr)
console.log(kk);