// 求数组元素的全排列,数组不含重复元素
/* var permute = function (nums) {
  let len = nums.length;
  let res = [];
  let arr = [];
  let backTrack = (arr) => {
    if (arr.length === len) {
      res.push(arr);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (!arr.includes(nums[i])) {
        arr.push(nums[i]);
        backTrack(arr.slice());
        arr.pop();
      }
    }
  };
  backTrack(arr);
  return res;
};
let kk = permute([
  [1, 2, 3],
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
]);
console.log(kk); 
*/

const getResult = (arrA, arrB) => {
  console.log(arrA, 'arrA');
  console.log(arrB, 'arrB');
  if (!Array.isArray(arrA) || !Array.isArray(arrB)) {
    return;
  }
  if (arrA.length === 0) {
    return arrB;
  }
  if (arrB.length === 0) {
    return arrA;
  }
  let result = [];
  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      result.push(arrA[i] + arrB[j]);
      //   result.push(String(arrA[i]) + String(arrB[j]));
    }
  }
  return result;
};

const findAll = (arr) => {
  return arr.reduce((total, current) => {
    // console.log(total, 'total');
    return getResult(total, current);
  }, []);
};
let kkb = findAll([
  [1, 2, 3],
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
]);
console.log(kkb);

// 最新版

function* perm(A, N) {
	if(!N) {N = A.length}
	if(N===1){ yield A.slice(); return}
	for (let i = 0; i < N; i++) {
		yield * perm(A, N - 1)
		let k 
		if((N % 2) == 1){
			k = swap(A, i, N - 1)
		}else{
			k = swap(A, 0, N - 1)	
		}
		console.log(k)
		console.log("11111111")
	}
}
console.log(swap([1,2,3],0,2));
function swap(arr,b,c) {
	let k = arr[b] 
	arr[b] = arr[c]	
	arr[c] = k
	return arr
}
console.log(123)
perm([1,2,3],3)
console.log()

// 1、将第一个位置分别放置各个不同的元素；
// 2、对剩余的位置进行全排列（递归）；
// 3、递归出口为只对一个元素进行全排列。
function swap(arr,i,j) {
	if(i!=j) {
			var temp=arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
	}
}
function show(arr) {
	console.log(arr)
}
function perm(arr) {
	(function fn(n) { //为第n个位置选择元素
			for(let i=n;i<arr.length;i++) {
					swap(arr,i,n);
					if(n+1<arr.length-1) //判断数组中剩余的待全排列的元素是否大于1个
							fn(n+1); //从第n+1个下标进行全排列
					else
							show(arr); //显示一组结果
					swap(arr,i,n);
			}
	})(0);
}
perm(["a","b","c"]);

// 打乱数组元素顺序
function fisher_yates_shuffle(arr) {
	for (let i = 0; i < arr.length; i++) {
		const j =  i + Math.floor(Math.random() * (arr.length - i ));
		[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}
let c = 0
for (let i = 0; i < 10000; i++) {
	const a = fisher_yates_shuffle([1,2,3,4])
	if(a[1] ===2){
		c++
	}
}
console.log(c/10000);
//  插入排序
function insertion_sort(A) {
	for (let j = 1; j < A.length; j++) {
		const key = A[j];
		let i = j - 1;
		while (i>=0 && A[i] > key) {
			A[i + 1] = A[i]
			console.log(A);
			i--
		}
		A[i + 1] = key
	}
	return A
}
console.log(insertion_sort([4,2,1,5]));

// 优化：二分插入排序
function binaryInsertSort(A) {
	let len = A.length
	if(len <=1) return A

	for (let i = 1; i < A.length; i++) {
		let temp = A[i],left = 0, right=i -1
		while (left <= right) {
			let index = parseInt((left + right) / 2)
			if(temp < A[index]){
				right = index -1
			}else{
				left  = index + 1
			}
		}
		for (let j = i - 1; j >= left; j--) {
			A[j + 1] = A[j]
		}
		A[left] = temp
	}
	return A
}
console.log(binaryInsertSort([4,2,1,5]));