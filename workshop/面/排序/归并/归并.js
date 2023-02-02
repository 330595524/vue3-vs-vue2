function merge1(arr1, arr2) {
  console.log('收到了了---', arr1, arr2);
  let i1 = 0,
    i2 = 0,
    result = [];
  while (i1 < arr1.length && i2 < arr2.length) {
    result.push(arr1[i1] < arr2[i2] ? arr1[i1++] : arr2[i2++]);
  }
  console.log(arr1, i1, arr2, i2);
  console.log('----------');
  let rest = i1 >= arr1.length ? arr2.slice(i2) : arr1.slice(i1);

  return result.concat(rest);
}

function mergeSort1(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge1(left, right);
}

function mergeSort(list) {
  console.log('进来的', list);
  if (list.length <= 1) return [...list];
  let mid = Math.floor(list.length / 2);
  return merge1(mergeSort(list.slice(0, mid)), mergeSort(list.slice(mid)));
}
function mergeSort2(arr, l, r) {
  if (l >= r) return;
  let mid = Math.floor(arr.length / 2);
  mergeSort2(arr, l, mid);
  mergeSort2(arr, mid + 1, r);
  let temp = [];

  let k = 0,
    p1 = l,
    p2 = mid + 1;
  while (p1 <= mid || p2 >= r) {
    if (p2 > r || (p1 <= mid && arr[p1] <= arr[p2])) {
      temp[k] = arr[p1];
      k += 1;
      p1 += 1;
    } else {
      temp[k] = arr[p2];
      k += 1;
      p2 += 1;
    }
  }
  for (let i = l; i < r; i++) {
    arr[i] = temp[i - l];
  }
  return;
}

let arr = [15, 22, 3, 8, 12, 92342, 13, 1, 33, 10];
console.log(mergeSort(arr));
// console.log(mergeSort2(arr, 0, arr.length));
