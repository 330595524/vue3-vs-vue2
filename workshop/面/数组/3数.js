let threeSum = function (nums = []) {
  let head, end, fixedVal;
  let result = [];
  nums.sort((a, b) => a - b);

  if (nums[0] > 0 || nums[nums.length - 1] < 0) {
    return result;
  }

  for (let i = 0; i < nums.length; i++) {
    fixedVal = nums[i];
    if (fixedVal == nums[i - 1]) continue;
    head = i + 1;
    end = nums.length - 1;
    while (head < end) {
      if (nums[head] + nums[end] + fixedVal == 0) {
        result.push([nums[head], nums[end], fixedVal]);
        head += 1;
        end -= 1;
        while (head < end && nums[head] === nums[head - 1]) {
          head += 1;
        }
        while (head < end && nums[end] === nums[end + 1]) {
          end -= 1;
        }
      } else if (nums[head] + nums[end] + nums[fixedVal] < 0) {
        head++;
      } else {
        end--;
      }
    }
  }
  return result;
};


let nums = [-1, 0, 1, 2, -1, -4];
let kk = threeSum(nums);
console.log(kk, 'lllll');
