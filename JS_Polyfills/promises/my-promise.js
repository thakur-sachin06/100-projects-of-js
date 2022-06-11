// Reference => https://skilled.dev/course/build-a-javascript-promise

class MyPromise {
  constructor(executionFunction) {
    this.promiseChain = [];
    this.handleError = () => {};
    executionFunction(this.onResolve, this.onReject);
  }

  then = (handleSuccess) => {
    this.promiseChain.push(handleSuccess);
    return this;
  };

  catch = (errFunction) => {
    this.handleError = errFunction;
  };

  onResolve = (apiRes) => {
    let storedValue = apiRes;
    try {
      if (this.promiseChain.length) {
        this.promiseChain.forEach((func) => {
          storedValue = func(storedValue);
        });
      }
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  };

  onReject = (error) => {
    this.handleError(error);
  };
}

fakeApiBackend = () => {
  const user = {
    username: "treyhuffine",
    favoriteNumber: 42,
    profile: "https://gitconnected.com/treyhuffine",
  };

  if (Math.random() > 0.5) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    const error = {
      statusCode: 404,
      message: "Could not find user",
      error: "Not Found",
    };

    return error;
  }
};

makeApiCall = () => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      let res = fakeApiBackend();
      if (res.statusCode === 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    }, 5000);
  });
};

makeApiCall()
  .then((user) => {
    console.log("In the first .then()");

    return user;
  })
  .then((user) => {
    console.log(
      `User ${user.username}'s favorite number is ${user.favoriteNumber}`
    );

    return user;
  })
  .then((user) => {
    console.log("The previous .then() told you the favoriteNumber");

    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log("This is the last then()");
  })
  .catch((error) => {
    console.log(error.message, "Error");
  });
