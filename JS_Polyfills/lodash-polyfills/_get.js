//! Q- check if path exists in an object or not

//? with recursion

function get(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let index = 0;
  let length = path.length;

  while (objectParam != null && index < length) {
    // if we get null as value no need to check furthur
    objectParam = objectParam[path[index]];
    index++;
  }
  let value;
  if (index && index === length) {
    // if index === length means we have found the value.
    value = objectParam;
  } else {
    value = undefined;
  }
  return value === undefined ? defaultValue : objectParam;
}
console.log(get({ a: { b: null } }, "a.b.c"));
