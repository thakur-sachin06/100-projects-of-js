// retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');

function wait(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function retry(asyncFn, retries = 3, delay = 50, finalError = "Failed") {
  return new Promise((resolve, reject) => {
    asyncFn.then(resolve).catch((err) => {
      if (retries) {
        wait(delay).then(() => {
          return retry(
            asyncFn,
            retries - 1,
            (delay = 50),
            (finalError = "Failed")
          )
            .then(resolve)
            .catch(reject);
        });
      } else {
        return reject(finalError);
      }
    });
  });
}

const pr = new Promise((res, rej) => rej(new Error("errro")));

retry(pr)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
