/**
 * Detect whether the array contains all the targets and support multiple parameters
 * 检测数组中是否包含全部目标,支持多参数
 * @param arr
 * @param target
 * @returns {boolean}
 */
export const contain = (arr, ...target) => {
    const array = target.map(val => arr.includes(val));
    return array.filter(value => value).length === target.length;
};
export const _initArray = (length = 0, normal = '') => {
    return Array.from({length}).fill(normal);
};
