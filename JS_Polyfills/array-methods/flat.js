function flat(arr, level) {
  let flatArr = [];
  let count = 0;

  function child(arr) {
    arr.map((elt) => {
      if (typeof elt === "object" && count < level) {
        count++;
        child(elt);
      } else if (typeof elt !== "object") {
        flatArr.push(elt);
      } else {
        flatArr.push(elt);
        count = 0;
      }
    });
  }

  child(arr);
  console.log(flatArr);
}

flat([1, [2, [10, 20, 40, 50], [900, 1000, 2000]], 3, 4], 2);
