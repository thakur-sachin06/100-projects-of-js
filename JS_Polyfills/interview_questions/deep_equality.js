// deeply compare objects.

function areEqual(obj1, obj2) {
  let result = true;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length === keys2.length) {
    keys1.forEach((key) => {
      if (keys2.indexOf(key) >= 0 && typeof obj1[key] === typeof obj2[key]) {
        if (typeof obj1[key] === "object") {
          result = areEqual(obj1[key], obj2[key]);
        } else if (obj1[key] !== obj2[key]) {
          result = false;
        }
      } else {
        result = false;
      }
    });
  } else {
    result = false;
  }
  return result;
}

const obj1 = {
  a: [90, { c: 90 }],
};

const obj2 = {
  a: [90, { c: 90 }],
};

console.log(areEqual(obj1, obj2));
