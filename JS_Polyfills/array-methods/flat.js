function flat(arr) {
  let flatArr = [];

  function child(arr) {
    arr.map((elt) => {
      if (typeof elt === "object") {
        child(elt);
      } else {
        flatArr.push(elt);
      }
    });
  }

  child(arr);
  console.log(flatArr);
}

flat([1, [2, [10, 20, 40, 50], 900], 3, 4], 1);
