class Input {
  constructor() {
    this.keys = new Map();
    this.justPressedKeys = new Set();
    this.justReleasedKeys = new Set();

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    if (!this.keys.get(event.code)) {
      this.justPressedKeys.add(event.code);
    }
    this.keys.set(event.code, true);
  };

  handleKeyUp = (event) => {
    this.keys.set(event.code, false);
    this.justReleasedKeys.add(event.code);
  };

  isPressed(code) {
    return !!this.keys.get(code);
  }

  isJustPressed(code) {
    return this.justPressedKeys.has(code);
  }

  isJustReleased(code) {
    return this.justReleasedKeys.has(code);
  }

  update() {
    this.justPressedKeys.clear();
    this.justReleasedKeys.clear();
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.keys.clear();
    this.justPressedKeys.clear();
    this.justReleasedKeys.clear();
  }
}

export default new Input();
