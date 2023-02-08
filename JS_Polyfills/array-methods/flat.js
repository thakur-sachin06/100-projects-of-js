// function flat(arr, level) {
//   let flatArr = [];
//   let count = 0;

//   function child(arr) {
//     arr.map((elt) => {
//       if (typeof elt === "object" && count < level) {
//         count++;
//         child(elt);
//       } else if (typeof elt !== "object") {
//         flatArr.push(elt);
//       } else {
//         flatArr.push(elt);
//         count = 0;
//       }
//     });
//   }

//   child(arr);
//   console.log(flatArr);
// }

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
