// bind polyfill.

Function.prototype.bindPolyfill = function (context, ...args) {
  let func = this;
  return function () {
    // func.call(context, ...args);

    func.apply(context, args);
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
