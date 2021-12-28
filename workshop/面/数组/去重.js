let arr = [2, 10, 3, 4, 5, 11, 10, 11, 20];
//  要求结果  [[2, 3, 4, 5], [10, 11], [20]]

function generateRadomArr(len) {
  let arr = new Array(len).fill();
  return arr.map(() => Math.floor(Math.random() * 100));
}

function reFlatten() {
  const sortArr = [];
  let arr = generateRadomArr(10);

  arr.sort((a, b) => a - b);
  arr = [...new Set(arr)];
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const n = Math.floor(item / 10);
    console.log(n);
    sortArr[n] = sortArr[n] || [];
    sortArr[n].push(item);
  }
  console.log(sortArr);
  return sortArr.filter((item) => item);
}

let kk = reFlatten();
console.log(kk, 'kk');
