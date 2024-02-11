// Polyfill for Array.prototype.flat using recursion with depth and closures
if (!Array.prototype.flatRecursive) {
  Array.prototype.flatRecursiveWithDepth = function (depth = 1) {
    const result = [];

    function flatten(arr, currentDepth) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && currentDepth < depth) {
          flatten(arr[i], currentDepth + 1);
        } else {
          result.push(arr[i]);
        }
      }
    }

    flatten(this, 0);
    return result;
  };
}

const nestedArray = [1, [2, [3, 4, [5, 6]], 7], 8];
console.log(nestedArray.flatRecursiveWithDepth(1));

// without closures
function flat(arr) {
  let flattedArr = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flattedArr = flattedArr.concat(flat(element));
    } else {
      flattedArr.push(element);
    }
  });
  return flattedArr;
}

const result = flat([1, [2, [10, 20, 40, 50], [900, 1000, 2000]], 3, 4]);
console.log(result);

// in O(n) without recursiion.
function arrFlat(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}

// without stack.
function flattenNonRecursion(arr) {
  const res = [...arr];
  let i = 0;

  while (i < res.length) {
    if (Array.isArray(res[i])) {
      res.splice(i, 1, ...res[i]);
    } else {
      i++;
    }
  }
  return res;
}
