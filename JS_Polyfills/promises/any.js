/*
    Promise.any() takes an iterable of elements (usually Promises). It returns a single promise that resolves as soon as any of 
    the elements in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill 
    (if all of the given elements are rejected), then the returned promise is rejected with an AggregateError, a new subclass of 
    Error that groups together individual errors.

    If an empty iterable is passed, then the promise returned by this method is rejected synchronously. The rejected reason 
    is an AggregateError object whose errors property is an empty array.
*/

function promiseAny(iterable) {
  const errors = [];
  let rejectedPr = 0;

  return new Promise((resolve, reject) => {
    if (!iterable.length) {
      reject(new AggregateError([]));
    }
    iterable.forEach((pr, index) => {
      Promise.resolve(pr).then(resolve, (err) => {
        errors[index] = err;
        rejectedPr++;
        if (rejectedPr === iterable.length) {
          reject(new AggregateError(errors));
        }
      });
    });
  });
}
