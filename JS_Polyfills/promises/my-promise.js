// // Reference => https://skilled.dev/course/build-a-javascript-promise

class MyPromise {
  constructor(callback) {
    callback(this.onResolve, this.onReject);
    this.promiseChain = [];
    this.handleErr = () => {};
  }

  onReject = (err) => {
    this.handleErr(err);
  };

  onResolve = (apiRes) => {
    let storedVal = apiRes;
    try {
      if (this.promiseChain.length) {
        this.promiseChain.forEach((callback) => {
          storedVal = callback(storedVal);
        });
        return storedVal;
      }
    } catch (err) {
      this.onReject(err);
    }
  };

  then = (fn) => {
    console.log(fn, "fn");
    this.promiseChain.push(fn);
    return this;
  };

  catch = (errFn) => {
    this.handleErr = errFn;
  };
}

const makApiCall = () => {
  return new MyPromise((reslove, reject) => {
    setTimeout(() => {
      reslove("success");
    }, 3000);
  });
};

makApiCall().then((res) => console.log(res));
