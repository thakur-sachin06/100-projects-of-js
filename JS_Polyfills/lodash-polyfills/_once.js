/*
    Implement a function that accepts a callback and restricts its invocation to at most once. 
    Subsequent calls of the function will return the result of the first invocation of the callback function. 
    The callback function is invoked with the this binding and arguments of the created function.
*/

function once(func) {
  let result = null;

  return function (...arg) {
    if (result) {
      return result;
    }
    result = func.call(this, ...arg);
    return result;
  };
}

/*
    Implement a function that accepts a callback and a number n, which restricts invocation of the callback to at most n times.
    Subsequent calls of the created function will return the result of the last invocation of the callback function. 
    The callback function is invoked with the this binding and arguments of the created function.
*/

function limit(func, n) {
  let count = 0,
    result;

  return function (...args) {
    if (count === n) {
      return result;
    }
    result = func.call(this, ...args);
    count++;
    return result;
  };
}
