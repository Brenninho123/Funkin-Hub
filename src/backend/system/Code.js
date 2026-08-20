class CodeManager {
  constructor() {
    this.modules = new Map();
  }

  registerModule(name, codeFn) {
    if (typeof codeFn === 'function') {
      this.modules.set(name, codeFn);
    }
  }

  executeModule(name, ...args) {
    if (this.modules.has(name)) {
      const fn = this.modules.get(name);
      return fn(...args);
    }
    return null;
  }

  hasModule(name) {
    return this.modules.has(name);
  }

  removeModule(name) {
    return this.modules.delete(name);
  }

  clear() {
    this.modules.clear();
  }
}

export default new CodeManager();
