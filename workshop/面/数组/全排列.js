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
