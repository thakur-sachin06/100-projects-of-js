// started reduce polyfill
Array.prototype.reducePolyfill = function (callback, startingValue) {
  let i = 0,
    acc = startingValue;
  if (acc === undefined) {
    acc = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }

  return acc;
};

const result = [1, 2, 3, 4].reducePolyfill(function (a, b) {
  return a * b;
}, 12);

console.log(result);

const sum = [1, 2, 3, 4].reduce((a, b) => a * b, 12);

console.log(sum);
