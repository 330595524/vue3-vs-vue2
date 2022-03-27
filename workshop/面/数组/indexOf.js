// 找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如7第一次出现的位置是4

var o = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67];
function findIndex(list, target) {
  let start = 0,
    end = list.length - 1;
  let index = -1;
  while (start != end && start < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (list[mid] > target) {
      end = mid - 1;
    } else if (list[mid] < target) {
      start = mid + 1;
    } else {
      index = mid;
      end = mid - 1;
    }
  }
  return index;
}
function findIndex2(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ret = -1;
  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left;
    //  const mid = Math.floor((left + right) / 2);
    let val = arr[mid];
    if (val >= target) {
      if (val === target) {
        ret = mid;
        right = mid - 1; // 结束条件，必须要加
      } else {
        right = mid - 1;
      }
    } else {
      left = mid + 1;
    }
  }
  return ret;
}

let kk = findIndex2(o, 12);
console.log(kk);
