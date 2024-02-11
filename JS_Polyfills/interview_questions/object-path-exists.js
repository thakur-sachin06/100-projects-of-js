//! Q- check if path exists in an object or not
const obj = {
  a: {
    b: { c: "d" },
  },
};
const path = "a.b.c.d";
function check(path, obj) {
  const pathKeys = path.split(".");
  if (obj[pathKeys[0]]) {
    if (pathKeys.length === 1) {
      return obj[pathKeys[0]];
    } else {
      const foundedKey = pathKeys.shift();
      return check(pathKeys.join("."), obj[foundedKey]);
    }
  } else {
    return "default";
  }
}

console.log(check(path, obj), "final");
