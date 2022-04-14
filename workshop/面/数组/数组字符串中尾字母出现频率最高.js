// [1a, 2b, 3a] => 4
let arr = ['1a', '2b', '3a'];
function add(arr) {
  let start = {};
  let maxEle = null;
  let count = 0;
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    let strArr = element.split('');
    let num = strArr[0];
    let key = strArr[strArr.length - 1];
    if (!start[key]) {
      start[key] = 1;
    } else {
      start[key]++;
    }
    if (start[key] > count) {
      count = start[key];
      maxEle = key;
      result += Number(num);
    }
  }
  console.log(count);
  console.log(maxEle);
  console.log(result);
}
add(arr);
