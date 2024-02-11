var length = 4;
function callback() {
  console.log(this.length); // 3
}
const object = {
  length: 5,
  method() {
    arguments[0]();
  },
};
object.method(callback, 1, 2);
// ANSWER - 3 =>  Because arguments[0]() is a method invocation of callback on arguments object,
//this inside the callback equals arguments.As result this.length inside callback() is same as arguments.length — which is 3.

const obj = {
  message: "Hello, World!",
  logMessage() {
    console.log(this.message);
  },
};
setTimeout(object.logMessage, 1000);

// undefined => after timer, object.logMessage is called as a normal function call, in which this will be global object.
// to get correct msg setTimeout(() => object.logMessage, 1000);

const clothes = ["jacket", "t-shirt"];
clothes.length = 0;
clothes[0]; // => ???
// clothes[0] is undefined, because clothes array has been emptied.
/*
    Reducing the value of the length property has the side-effect of 
    deleting own array elements whose array index is between the old and new length values. 
*/
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);
{
  numbers.push(i + 1);
}
numbers;
//answer [5] because there is ; before { in for loop. {} not a body of for

let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  };
  setTimeout(log, 100);
}

/*
    ANSWER - 3,3,3 because i is declared outside of for loop so only one i will be declared and when timer is out value of
    i will be 3. TO SOLVE THIS - 

        for (let i = 0; i < 3; i++) {
        const log = () => {
            console.log(i);
        }
        setTimeout(log, 100);
        }
        let has block scope, so for each iteratin a new i will be created so we get 0,1,2
*/

for (var i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  };
  setTimeout(log, 100);
}

/*
  var has function scope, here only one i will be created, so we get 3,3,3
  to solve this use IIFEE, which will create a new i for each iteratio
    for (var i = 0; i < 3; i++) {
        (function(j) {
            const log = () => {
                console.log(j);
            }
            setTimeout(log, 100);
            
        })(i);
    }
*/
