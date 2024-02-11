function debounce(func, wait = 0) {
  let timerId = null;
  let context = undefined;
  let argsToInvoke = undefined;

  function cancel() {
    clearTimeout(timerId);
    timerId = null;
  }

  function flush() {
    if (timerId === null) {
      return;
    }
    cancel();
    func.call(context, ...argsToInvoke);
  }

  function inner(...args) {
    cancel();
    argsToInvoke = args;
    context = this;
    timerId = setTimeout(function () {
      flush();
    }, wait);
  }

  inner.cancel = cancel;
  inner.flush = flush;

  return inner;
}
