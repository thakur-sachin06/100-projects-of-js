//! bind polyfill.
Function.prototype.bindPolyfill = function (context, ...args) {
  let func = this;
  return function () {
    // func.call(context, ...args);

    func.apply(context, args);
  };
};

//! without apply
Function.prototype.myBind = function (thisArg, ...argArray) {
  if (thisArg === null) {
    thisArg = {};
  }
  thisArg.fn = this;
  return function (...args) {
    return thisArg.fn(...argArray, ...args);
  };
};
let obj = {
  name: "Sachin",
};

function myFunc(lastname, id) {
  console.log(this.name, lastname, id);
}

const customBind = myFunc.bindPolyfill(obj, "Thakur", 34);
customBind();

//! call Polyfill
Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  context.fn(...args);
};

myFunc.myCall(obj, "Thakur", 36);

//! apply polyfill
Function.prototype.myApply = function (context, args) {
  if (context === null) {
    context = {};
  }
  context.fn = this;
  context.fn(...args);
};

myFunc.myApply(obj, ["Thakur", 36]);

//! apply polyfill with call
Function.prototype.myApply = function (thisArg, argArray = []) {
  return this.call(thisArg, ...argArray);
};
