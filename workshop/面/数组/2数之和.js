// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
// 你可以假 设每个输入只对应一种答案，且同样的元素不能被重复利用。 示例:
let nums = [2, 7, 11, 15],
  target = 9;
function computed(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    map.set(element, i);
  }

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const value = map.get(target - element);
    if (value && value !== i) {
      return [i, value];
    }
  }
}
console.log(computed(nums,target));
