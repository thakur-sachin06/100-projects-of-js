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
