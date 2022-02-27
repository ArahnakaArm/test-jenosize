function find24(nums) {
    if (nums.length === 1) {
        return nums[0] === 24;
    }
    let ans = false;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            // grab other numbers
            const rest = [];
            for (let k = 0; k < nums.length; k++) {
                if (k !== i && k !== j) rest.push(nums[k]);
            }
            // grab all possibilities
            const target = [nums[i] + nums[j], nums[i] - nums[j], nums[j] - nums[i], nums[i] * nums[j]];
            if (nums[i] !== 0) target.push(nums[j] / nums[i]);
            if (nums[j] !== 0) target.push(nums[i] / nums[j]);
            // try next around
            for (const t of target) {
                ans = ans || find24([t, ...rest]);
            }
        }
    }

    return ans;
}
module.exports = { find24 };
