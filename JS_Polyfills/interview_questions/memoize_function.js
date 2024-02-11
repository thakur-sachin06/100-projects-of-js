const memoize = (callback) => {
  let memo = {};
  return (...args) => {
    if (memo[args]) {
      return memo[args];
    } else {
      memo[args] = callback(...args);
      return memo[args];
    }
  };
};

const sum = (a, b) => a + b;
const memoizedFac = memoize(sum);
console.log(memoizedFac(10, 30));
