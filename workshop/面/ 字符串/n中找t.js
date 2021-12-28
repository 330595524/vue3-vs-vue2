// 实现一个字符串匹配算法，从长度为 n 的 字符串 S 中，查找是否存在字符串 T，T 的 长度是 m，若存在返回所在位置
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var rotate = function(nums, k) {
    let len = nums.lenght 
     k = k%len
    nums.unshift(...nums.splice(len - k))
 };
 let aa = [1,2,3,4,5]
 rotate(aa, 3)
 console.log(aa);
