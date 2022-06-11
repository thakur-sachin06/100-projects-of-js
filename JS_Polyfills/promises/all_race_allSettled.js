/*
1 => Polyfills for promise.all()

promise.all() = method takes an iterable of promises as an input, and returns a single Promise that
to an array of the results of the input promises. This returned promise will resolve when all of
input's promises have resolved, or if the input iterable contains no promises. It rejects
upon any of the input promises rejecting or non-promises throwing an error, and will reject with this
first rejection message / error.

*/

function allPolyfill(promises) {
  let resultArr = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          resultArr.push(res);
          if (promises.length === resultArr.length) {
            resolve(resultArr);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

const promise1 = Promise.resolve("789");
const promise2 = Promise.resolve("promise 2 resolved");
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "foo");
});

allPolyfill([promise1, promise2, promise3])
  .then((values) => console.log(values))
  .catch((err) => console.log(err));
