function random1(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
// 随机插入排序
function random2(arr) {
  const cArr = [...arr];
  const newArr = [];
  while (cArr.length) {
    const index = Math.floor(Math.random() * cArr.length);
    newArr.push(cArr[index]);
    cArr.splice(index, 1);
  }

  return newArr;
}
// 洗牌算法，随机交换排序
function random3(arr) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    const index = Math.floor(Math.random() * (l - i)) + i;
    console.log(index, i);
    const temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

let kk = random3([1, 23,4,5]);
console.log(kk);
