function a() {
  console.log("1");
}
a();
function a() {
  console.log("2");
}
a();
// 2, 2

var a = 1;
console.log(a);
var a = 2;
console.log(a);
// 1, 2

var test = 1;
function functionHoisting() {
  test = 10;
  return;
  function test() {}
}
functionHoisting();
console.log(test);
// 1
/*
    because above code by js
        var test = 1;
        function functionHoisting() {
            function test() {} //function Hoisting, test is re-defined and re-declared
            test = 10;
            return;
        }
        functionHoisting();
        console.log(test); // 1
*/

alert(a());
function a() {
  var b = function () {
    return 3;
  };
  return b();

  // function expressions not hoisted
  var b = function () {
    return 8;
  };
}
// 3 => no hoisting of second b()

alert(a());
function a() {
  function b() {
    return 3;
  }
  return b();

  // this fn will hoist
  function b() {
    return 8;
  }
}
// 8 => hoisting of second b()

function parent() {
  var hoisted = "I'm a variable";
  function hoisted() {
    return "I'm a function";
  }
  return hoisted();
}
console.log(parent());
// Output: “TypeError: hoisted is not a function”
