//! Q- check if path exists in an object or not

//? with recursion

function get(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let index = 0;
  let length = path.length;

  while (objectParam != null && index < length) {
    objectParam = objectParam[path[index]];
    index++;
  }
  let value;
  console.log(index, length, "index");
  if (index && index === length) {
    value = objectParam;
  } else {
    value = undefined;
  }
  return value === undefined ? defaultValue : objectParam;
}
console.log(get({ a: { b: null } }, "a.b.c"));
