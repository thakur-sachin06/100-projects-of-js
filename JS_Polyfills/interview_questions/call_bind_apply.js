// bind polyfill.

Function.prototype.bindPolyfill = function (context, ...args) {
  let func = this;
  return function () {
    // func.call(context, ...args);

    func.apply(context, args);
  };
};

// without apply
Function.prototype.myBind = function (context, ...args) {
  /* Since we are not using call/apply, create a reference of
    binding method within the context, and method will be invoked
    as context.fn() */
  context.fn = this;
  return function (...funcArgs) {
    context.fn(...[...args, ...funcArgs]);
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

//call Polyfill
Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  context.fn(...args);
};

myFunc.myCall(obj, "Thakur", 36);

//apply polyfill

Function.prototype.myApply = function (context, args) {
  context.fn = this;
  context.fn(...args);
};

myFunc.myApply(obj, ["Thakur", 36]);
