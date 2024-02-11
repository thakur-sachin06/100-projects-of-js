const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 10);
});
const promise2 = Promise.resolve(3);
const promise3 = 4;

/*
1 => Polyfills for promise.all()

  promise.all() = method takes an iterable of promises as an input, and returns a single Promise that
  to an array of the results of the input promises. This returned promise will resolve when all of
  input's promises have resolved, or if the input iterable contains no promises. It rejects
  upon any of the input promises rejecting or non-promises throwing an error, and will reject with this
  first rejection message / error.
*/
function myPromiseAll(taskList) {
  //to store results
  const results = [];
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      // if not a promise.
      if (!promise.then) {
        results[index] = promise;
        console.log(results, "in");
        promisesCompleted++;
        if (promisesCompleted === taskList.length) {
          resolve(results);
        }
      } else {
        promise
          .then((val) => {
            results[index] = val;
            console.log(results, val, "out");
            promisesCompleted += 1;
            if (promisesCompleted === taskList.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
}
myPromiseAll([promise1, promise2, promise3]).then((response) =>
  console.log(response, "all")
);

// ! using Promise.resolve no need to check for promise or non promise.

export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }
    //! here we  reject() rejected promises in the .then() call (via the second callback parameter) and not within catch().
    // ? refer <race.js>
    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          unresolved -= 1;

          if (unresolved === 0) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}
