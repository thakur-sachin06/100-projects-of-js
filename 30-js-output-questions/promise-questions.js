console.log("start");
const promise1 = new Promise((resolve, reject) => {
  console.log(1); // will run synchronously
  resolve(2);
});
promise1.then((res) => {
  console.log(res);
});
console.log("end");
/*
    start , 1 , end, 2
*/

const pr = new Promise((resolve, reject) => {
  reject(Error("Some Error Occurred"));
})
  .catch((error) => console.log(error)) // catch will return a promise and we are not returning any value from catch so we get undefined in then
  .then((error) => console.log(error));
// Some error occurred
// undefined

const promise = new Promise((res) => res(2));
promise
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .finally((v) => {
    // finally will run when all then are completed and from last then we are not returning anything so we get undefined in finally
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
  });
// 2
// 4
// undefined
// 8
