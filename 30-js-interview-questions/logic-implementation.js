//T1, T2, T3 and T4...
// function T(cb) {
//   // some async work
//   cb()
// }
// Implement Scheduler
// At most n tasks should be running in parallel
// expose a addTask method to add new tasks to the scheduler
// Need to keep a queue of tasks that have been added by the
// addTask method
// Need to keep another array/queue to keep currently running
// tasks whose max length can be n
function Scheduler(maxTasks) {
  const taskQueue = [];
  let runningTasks = 0;

  const addTask = (task) => {
    taskQueue.push(task);
    runNextTask();
  };

  const runNextTask = () => {
    if (taskQueue.length && runningTasks < maxTasks) {
      const task = taskQueue.shift();
      runningTasks++;
      task(onTaskComplete);
    }
  };

  const onTaskComplete = () => {
    runningTasks--;
    runNextTask();
  };

  return { addTask };
}

const T1 = (callback) =>
  setTimeout(() => {
    console.log("T1 completed");
    callback();
  }, 5000);
const T2 = (callback) =>
  setTimeout(() => {
    console.log("T2 completed");
    callback();
  }, 5000);
const T3 = (callback) =>
  setTimeout(() => {
    console.log("T3 completed");
    callback();
  }, 5000);
const T4 = (callback) => {
  console.log("T4 completed");
  callback();
};
const T5 = (callback) =>
  setTimeout(() => {
    console.log("T5 completed");
    callback();
  }, 400);

const s1 = new Scheduler(5);
s1.addTask(T1);
s1.addTask(T2);
s1.addTask(T3);
s1.addTask(T4);
s1.addTask(T5);

//Q- check if path exists in an object or not
const obj = {
  a: {
    b: { c: "d" },
  },
};
const path = "a.b.c.d";
function check(path, obj) {
  const pathKeys = path.split(".");
  if (obj[pathKeys[0]]) {
    if (pathKeys.length === 1) {
      return obj[pathKeys[0]];
    } else {
      const foundedKey = pathKeys.shift();
      return check(pathKeys.join("."), obj[foundedKey]);
    }
  } else {
    return "default";
  }
}

console.log(check(path, obj), "final");

//Q- defer
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
