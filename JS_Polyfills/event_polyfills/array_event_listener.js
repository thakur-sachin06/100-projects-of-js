export default class EventEmitter {
  constructor() {
    this.eventQueue = Object.create(null);
  }

  on(eventName, listener) {
    if (!Object.hasOwn(this.eventQueue, eventName)) {
      this.eventQueue[eventName] = [];
    }
    this.eventQueue[eventName].push(listener);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    if (
      !Object.hasOwn(this.eventQueue, eventName) ||
      this.eventQueue[eventName].length === 0
    ) {
      return this;
    }
    const listeners = this.eventQueue[eventName];
    const index = listeners.findIndex(
      (listenerItm) => listenerItm === listener
    );
    if (index < 0) return this;
    this.eventQueue[eventName].splice(index, 1);
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (
      !Object.hasOwn(this.eventQueue, eventName) ||
      this.eventQueue[eventName].length === 0
    ) {
      return false;
    }
    const listeners = this.eventQueue[eventName];
    if (listeners && listeners.length) {
      listeners.forEach((listener) => listener(...args));
    }
    return true;
  }
}
