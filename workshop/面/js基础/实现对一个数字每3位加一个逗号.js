// 相当于封装字符串的 toLocaleString 方法
// const str = num.toLocaleString()

// 给定的数字（不考虑负数，小数）
const num = 100000;
// 实现对一个数字每3位加一个逗号，如输入100000，输出100,000(不考虑负数，小数)
function toLocaleString(num) {
  // 将数字转换成字符串，并分割成数组
  // 注意：用split方法时，里面必须加双引号，才会逐个字符分割,再反转数组
  const arr = num.toString().split('').reverse();
  console.log(arr);
  // 遍历数组
  for (let i = 0; i < arr.length; i++) {
    // 如果索引被3整除，并且索引不为0
    if (i % 3 === 0 && i !== 0) {
      // 在当前字符前面加一个逗号
      arr[i] = arr[i] + ',';
    }
  }
  // 遍历完后，先反转数组，再将数组转换为字符串
  // 注意：用join方法时，里面必须加双引号，不然默认会用逗号分割
  const str = arr.reverse().join('');
  // 返回这个字符串
  return str;
}

const str = toLocaleString(num);

console.log(str);
