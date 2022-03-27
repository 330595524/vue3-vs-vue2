let testArr = [1, 34, 5, 76, 8, 6, 9, 7, 6, 3];
      
var quickSort = function (arr) {
  // 检查数组的元素个数，如果小于等于1，就返回。
  if (arr.length <= 1) {
    return arr;
  }
  // 选择"基准"（pivot），并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集。
  const pivotIndex = Math.floor(arr.length / 2); //Math.floor向下取整 45.11 => 45
  const pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  const len = arr.length;
  // 开始遍历数组，小于"基准"的元素放入左边的子集，大于基准的元素放入右边的子集。
  for (let i = 0; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 使用递归不断重复这个过程，就可以得到排序后的数组
  return quickSort(left).concat([pivot], quickSort(right));
};

var result = quickSort(testArr);
console.log(result);// [1, 3, 5, 6, 6, 7, 8, 9, 34, 76]
// ----------------------2---------
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
