// Debounce

// ! https://medium.com/@griffinmichl/implementing-debounce-in-javascript-eab51a12311e

const ip = document.getElementById("ip");

const handleChange = (e) => {
  console.log(e.target.value);
};

/*
  Edge Cases

The main pitfall in this question is invoking the callback function with the correct this, the value of this when the
debounced function was called. Since the callback function will be invoked in a timeout, we need to ensure that the
first argument to func.apply()/func.call() is the right value. There are two ways to achieve this:

?1=>  Use another variable to keep a reference to this and access this via that variable from within the setTimeout callback.
      This is the traditional way of preserving this before arrow functions existed.
?2=>  Use an arrow function to declare the setTimeout callback where the this value within it has lexical scope.
      The value of this within arrow functions is bound to the context in which the function is created, not to the environment
      in which the function is called.

*/

function debounce(func, wait) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    const context = this;
    timerId = setTimeout(() => func.call(context, ...args), wait);
  };
}

ip.addEventListener("keyup", debounce(handleChange, 1000));

//Throttling

// Throttling implies limiting the number of times a function gets called in a certain time period.
//  It will prohibit a function from executing, if we have invoked it “recently.”
//  Throttling also guarantees that a function runs at a consistent rate.

// USE CASES

// Action games
// Action games typically need the player to push a button to carry out a crucial action, such as shooting, punching, etc.
// But users typically press the buttons more than is necessary, perhaps due to the excitement and intensity of the action,
// as we are aware. The gaming character can only shoot one bullet per second, despite the player hitting “Fire” 10 times in 5 seconds.
// It seems reasonable in this situation to reduce activities. Limiting the “Fire” action in this case to one second would ignore the
// second button press per second.

// Scroll event listeners
// Many web applications utilize a scroll event listener to keep track of the scroll position and load or animate the content appropriately.
// In these cases, the scroll event may have a negative performance impact if we scroll it too frequently since it contains many
// videos and images. Thus, we must use throttling for the scroll event.

// Button click listeners
// We won’t be able to make any further transactions in ATM until a specified period
// of time has elapsed. We may also apply it to buttons within a web application. The click event listener’s callback will only run
// when a specific amount of time has passed since the last invocation. It will help to reduce the user’s spam-clicking.

// API calls
// In some cases, we may wish to limit how frequently our application calls an external API. In this case, throttling can be
// advantageous. By rate limiting the calling function, it would eliminate unnecessary API requests to the server.

const throttle = (callback, timer = 1000) => {
  let timerId;
  return function () {
    const args = [...arguments];
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      callback.apply(null, args);
      timerId = undefined;
    }, timer);
  };
};
