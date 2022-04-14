// 找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如7第一次出现的位置是4
const arr = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67];
const myfind = function (arr, key) {
  let position = -1;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item === key) {
      position = i;
      break;
    }
  }
  return position;
};
let kk = myfind(arr, 7);
console.log(kk);
console.log(arr.findIndex((i)=>i==7));
