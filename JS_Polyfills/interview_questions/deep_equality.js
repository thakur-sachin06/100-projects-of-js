// ! The most common application for the toString 'hack' is to figure out what type of object you're dealing with:

// typeof(new Array())  === "object";
// typeof(new Date())   === "object";
// typeof(new RegExp()) === "object";

// Object.prototype.toString.call(new Array()).slice(8, -1)  === "Array";
// Object.prototype.toString.call(new Date()).slice(8, -1)   === "Date";
// Object.prototype.toString.call(new RegExp()).slice(8, -1) === "RegExp";

function isBothArrOrObj(arg1, arg2) {
  return (
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  );
}

export default function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object" || obj1 === null) {
    return obj1 === obj2;
  }

  if (!isBothArrOrObj(obj1, obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
