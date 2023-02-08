const obj = { a: { b: 5, d: { c: 87 } } };

function flatObj(obj, parent = null) {
  let result = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    let keyName = parent ? `${parent}_${key}` : key;
    if (typeof obj[key] === "object") {
      result = {
        ...result,
        ...flatObj(obj[key], keyName),
      };
    } else {
      result[keyName] = obj[key];
    }
  });
  return result;
}

console.log(flatObj(obj));
