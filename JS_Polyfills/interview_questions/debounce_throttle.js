// Debounce
const ip = document.getElementById("ip");

const handleChange = (e) => {
  console.log(e.target.value);
};

const debounce = (callback, timer = 1000) => {
  let timerId;
  return function () {
    const args = [...arguments];
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => callback.apply(null, args), timer);
  };
};

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
