const object = {
  message: "Hello, World!",
  getMessage() {
    const message = "Hello, Earth!";
    return this.message;
  },
};
console.log(object.getMessage()); // Hello, World!

function Pet(name) {
  this.name = name;
  this.getName = () => this.name;
}
const cat = new Pet("Fluffy");
console.log(cat.getName()); // Fluffy
const { getName } = cat;
console.log(getName()); // Fluffy

const object1 = {
  message: "Hello, World!",
  logMessage() {
    console.log(this.message); // undefined
  },
};
setTimeout(object1.logMessage, 1000);
// While setTimeout() function uses the object.logMessage as a callback, still, it inovkes object.logMessage as a regular function, rather than a method.
// And during a regular function invocation this equals the global object, which is window in the case of the browser environment.

const object2 = {
  who: "World",
  greet() {
    return `Hello, ${this.who}!`;
  },
  farewell: () => {
    return `Goodbye, ${this.who}!`;
  },
};
console.log(object2.greet()); // Hello, World
console.log(object2.farewell()); // Goodbye, undefined!

var length = 4;
function callback() {
  console.log(this.length); // 4
}
const object4 = {
  length: 5,
  method(callback) {
    callback();
  },
};
object4.method(callback, 1, 2);

var length = 4;
function callback() {
  console.log(this.length); // 3
}
const object5 = {
  length: 5,
  method() {
    arguments[0]();
  },
};
object5.method(callback, 1, 2);
// arguments[0]() is a method invocation of callback on arguments object, this inside the
//  callback equals arguments.
//  As result this.length inside callback() is same as arguments.length — which is 3.
