const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    switch (current) {
      case "--discard-next":
        if (i < arr.length - 1) {
          if (typeof arr[i+2] != 'number') {
            i++;
          }
          i++;
        }
        break;

      case "--discard-prev":
        if (result.length > 0 && arr[i - 1] !== undefined) {
          result.pop();
        }
        break;

      case "--double-next":
        if (i < arr.length - 1) {
          result.push(arr[i + 1]);
        }
        break;

      case "--double-prev":
        if (i > 0 && arr[i - 1] !== undefined) {
          result.push(arr[i - 1]);
        }
        break;

      default:
        result.push(current);
        break;
    }
  }

  return result;
}

module.exports = {
  transform,
};
