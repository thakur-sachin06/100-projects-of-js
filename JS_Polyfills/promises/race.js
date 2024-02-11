/*
    ! https://dmitripavlutin.com/javascript-promises-then-vs-then-catch/
    JavaScript Promises: then(f,f) vs then(f).catch(f)
    The main difference between the forms promise.then(success, error) and promise.then(success).catch(error) is that in case if success callback returns a rejected promise, 
    then only the second form is going to catch that rejection.
/*

/*
  ? The Promise.race()
    method returns a promise that fulfills or rejects as soon as one of the promises
    in an iterable fulfills or rejects, with the value or reason from that promise.
*/

function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (!iterable.length) {
      return;
    }
    iterable.forEach((pr) => {
      Promise.resolve(pr).then(resolve, reject);
    });
  });
}

/*
! It's important to reject() rejected promises in the .then() call (via the second callback parameter) and not within catch(). 
    The approach BELOW looks similar but doesn't work for cases where the iterable contains both immediately resolved and rejected 
    promises (e.g. [Promise.reject(42), Promise.resolve(2)]).

    .catch() is scheduled, and does not run immediately after .then(). For immediately settled promises, .then() run before any .catch(), 
    hence the overall Promise is fulfilled with 2 instead of rejected with 42. 
*/

function racePolyfill(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((res) => resolve(res)).catch((err) => reject(err));
    });
  });
}
