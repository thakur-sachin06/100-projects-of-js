const promise1 = Promise.reject(0);
const promise2 = new Promise((res, reject) => setTimeout(res, 100, "quick"));
const promise3 = new Promise((res, reject) => setTimeout(res, 500, "slow"));

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
        promisesCompleted++;
        if (promisesCompleted === taskList.length) {
          resolve(results);
        }
      } else {
        promise
          .then((val) => {
            results[index] = val;
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
myPromiseAll([promise3, promise2, promise1]).then((response) =>
  console.log(response)
);

/*
  2 => The Promise.race()
    method returns a promise that fulfills or rejects as soon as one of the promises
    in an iterable fulfills or rejects, with the value or reason from that promise.
*/

function racePolyfill(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((res) => resolve(res)).catch((err) => reject(err));
    });
  });
}

racePolyfill([promise1, promise2])
  .then((value) => console.log(value))
  .catch((err) => console.log(err, "Error"));

/*
  3 => The Promise.allSettled()
    method returns a promise that resolves after all of the given promises 
    have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

      It is typically used when you have multiple asynchronous tasks that are not dependent on 
      one another to complete successfully, or you'd always like to know the result of each promise.
*/

// allSettled without all
function myAllSettled(taskList) {
  //to store results
  const results = [];
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      if (!promise.then) {
        results[index] = { status: "fulfilled", value: promise };
        results[index] = promise;
        promisesCompleted++;
        if (promisesCompleted === taskList.length) {
          resolve(results);
        }
      } else {
        promise
          .then((val) => {
            results[index] = { status: "fulfilled", value: val };
            promisesCompleted += 1;
            if (promisesCompleted === taskList.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            results[index] = { status: "rejected", reason: error };
            promisesCompleted += 1;
            if (promisesCompleted === taskList.length) {
              resolve(results);
            }
          });
      }
    });
  });
}

const promises1 = [promise1, promise2];

allSettledPolyfill(promises1).then((results) =>
  results.forEach((result) => console.log(result))
);

/*
  4 => Promise.any()
    takes an iterable of Promise objects. It returns a single promise that resolves as soon 
    any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in 
    the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected 
    with an AggregateError, a new subclass of Error that groups together individual errors.
*/

function anyPolyfill(promises) {
  let rejectedCount = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject("AggregateError: All promises were rejected");
          }
        });
    });
  });
}

const promises2 = [promise1, promise2, promise3];

anyPolyfill(promises2)
  .then((value) => console.log(value))
  .catch((err) => console.log(err));
