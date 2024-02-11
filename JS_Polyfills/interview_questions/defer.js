//! Q- defer
function defer(fn, delay) {
  let queue = [];

  function trigger() {
    timer = undefined;
    let queueData = [...queue];
    queue = [];
    let allArgs = queueData.map((i) => i.args);

    fn(allArgs).then((responses) => {
      responses.forEach((response, i) => {
        queueData[i].resolve(response);
      });
    });
  }

  let timer;

  return function (...args) {
    let resolve, reject;
    let p = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    queue.push({ args, resolve, reject });

    if (!timer) {
      timer = setTimeout(trigger, delay);
    }

    return p;
  };
}
function getAsset({}) {
  return new Promise((res, rej) => {});
}
let getAssetDefered = defer(getAsset);
getAssetDefered();
