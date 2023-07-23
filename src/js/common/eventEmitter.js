export const EventEmitter = {
  events: {},
  on(value, listener) {
    if (typeof this.events[value] !== "object") {
      this.events[value] = [];
    }
    this.events[value].push(listener);
    return () => this.removeListener(value, listener);
  },
  removeListener(value, listener) {
    if (typeof this.events[value] === "object") {
      const idx = this.events[value].indexof(listener);
      if (idx > -1) {
        this.events.splice(idx, 1);
      }
    }
  },
  emit(value, ...args) {
    if (typeof this.events[value] === "object") {
      this.events[value].forEach((listener) => listener.apply(this, args));
    }
  },
};
