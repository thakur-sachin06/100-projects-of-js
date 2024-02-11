function deepClone(input) {
  if (input === null || typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    const newArray = [];
    for (let i = 0; i < input.length; i++) {
      newArray[i] = deepClone(input[i]);
    }
    return newArray;
  }

  const newObj = {};
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      newObj[key] = deepClone(input[key]);
    }
  }

  return newObj;
}

const obj = { a: 90 };

const clone = deepClone(obj);

console.log(clone, obj);
