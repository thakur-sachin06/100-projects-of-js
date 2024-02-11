/*
    Implement a function countBy(array, iteratee) that creates an object composed of keys generated from the results of 
    running each element of array thru iteratee. The corresponding value of each key is the number of times the key was returned 
    by iteratee. iteratees can either be:

    Functions: iteratee functions is invoked with one argument: (value).
    Strings: The property of an object. E.g. 'length' can be used to return the number of elements of arrays.
*/

function countBy(array, iteratee) {
  let result = {};

  array.forEach((elt) => {
    let res;
    if (typeof iteratee === "function") {
      res = iteratee(elt);
    } else {
      res = elt[iteratee];
    }
    result[res] ? (result[res] += 1) : (result[res] = 1);
  });

  return result;
}
