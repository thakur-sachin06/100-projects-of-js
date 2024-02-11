const squashedKey = (parent, key) => {
  if (parent !== null && key.length) {
    return `${parent}.${key}`;
  } else if (parent && !key.length) {
    return parent;
  } else return key;
};

export default function squashObject(obj, parent = null) {
  let result = {};
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    let realKey = squashedKey(parent, key);
    const val = obj[key];
    if (typeof val === "object" && val !== null && val !== undefined) {
      result = { ...result, ...squashObject(val, realKey) };
    } else {
      result[realKey] = val;
    }
  });

  return result;
}
