let nums = [-1, 0, 1, 2, -1, -4];
var threeNum = function (nums) {
  let head, end, fixedVal;
  let result = [];
  nums.sort((a, b) => a - b);
  //判断数组内元素是否都为整数或负数，直接返回
  if (nums[0] > 0 || nums[nums.length - 1] < 0) {
    return result;
  }

  for (let i = 0; i < nums.length; i++) {
    fixedVal = nums[i];
    // 如果前后元素相同，跳过此次循环（固定值）
    if (fixedVal === nums[i - 1]) continue;
    head = i + 1;
    end = nums.length - 1;
    while (head < end) {
      if (nums[head] + nums[end] + fixedVal === 0) {
        result.push([nums[head], nums[end], fixedVal]);
        head++;
        end--;
        while (nums[head] === nums[head - 1]) {
          head++;
        }
        while (nums[end] === nums[end + 1]) {
          end--;
        }
      } else if (nums[head] + nums[end] + fixedVal < 0) {
        head++;
      } else {
        end--;
      }
    }
  }
  return result;
};

console.log(threeNum(nums));
