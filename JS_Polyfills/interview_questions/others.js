//1 => curry;

function outer() {
  let args1 = [...arguments];
  let result = args1.reduce((a, b) => a + b);
  return function () {
    let args2 = [...arguments];
    return args2.length ? outer(result, ...args2) : result;
  };
}

let add = outer(1)(2)(3, 10)();

console.log(add);

// 2 => setInterval with setTimeout
const customInterval = (callback) => {
  const timer = setTimeout(() => {
    callback();
    customInterval(callback);
  }, 2000);
};

customInterval(() => console.log("test"));

let timers = [];

const createTimer = (callback, time) => {
  let id = setTimeout(() => callback(), time);
  timers.push(id);
};

const clearAllTimers = () => {
  if (timers.length) {
    timers.forEach((id) => clearTimeout(id));
  }
};

function test() {
  console.log("hello 1");
}

createTimer(() => console.log("hello 1"), 100);
createTimer(() => console.log("hello 2"), 200);
createTimer(() => console.log("hello 3"), 300);
createTimer(() => console.log("hello 4"), 400);
createTimer(() => console.log("hello 5"), 500);

setTimeout(() => clearAllTimers(), 400);

// 3 => implement these functions
function one() {}
function two() {}
function plus() {}
function minus() {}

one(plus(two())); // 3
one(plus(one())); // 2
two(mius(one())); // 1
two(mius(two())); // 0
