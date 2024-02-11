/* 
! Promise.allSettled()
    method returns a promise that resolves after all of the given promises
    have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

      It is typically used when you have multiple asynchronous tasks that are not dependent on
      one another to complete successfully, or you'd always like to know the result of each promise.
*/

function promiseAllSettled(iterable) {
  let result = Array.from(iterable.length);
  let completedPr = 0;
  return new Promise((resolve, reject) => {
    if (!iterable.length) {
      resolve([]);
    }
    iterable.forEach((pr, index) => {
      Promise.resolve(pr).then(
        (res) => {
          result[index] = { status: "fulfilled", value: res };
          completedPr++;
          if (completedPr === iterable.length) resolve(result);
        },
        (err) => {
          result[index] = { status: "rejected", reason: err };
          completedPr++;
          if (completedPr === iterable.length) resolve(result);
        }
      );
    });
  });
}
