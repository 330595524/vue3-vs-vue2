/**
 * Created: xulimin
 * Date: 2023-02-02
 */

function insertionSort(nums) {
  let len = nums.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = nums[i]
    while (preIndex >= 0 && nums[preIndex] > current) {
      nums[preIndex + 1] = nums[preIndex]
      preIndex--
    }
    nums[preIndex + 1] = current
  }
  return nums
}
