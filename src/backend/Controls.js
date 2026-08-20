class Controls {
  constructor() {
    this.bindings = new Map([
      ['UI_UP', ['ArrowUp', 'KeyW']],
      ['UI_DOWN', ['ArrowDown', 'KeyS']],
      ['UI_LEFT', ['ArrowLeft', 'KeyA']],
      ['UI_RIGHT', ['ArrowRight', 'KeyD']],
      ['ACCEPT', ['Enter', 'Space']],
      ['BACK', ['Escape', 'Backspace']],
      ['NOTE_UP', ['ArrowUp', 'KeyK']],
      ['NOTE_DOWN', ['ArrowDown', 'KeyJ']],
      ['NOTE_LEFT', ['ArrowLeft', 'KeyD']],
      ['NOTE_RIGHT', ['ArrowRight', 'KeyF']]
    ]);

    this.inputState = new Map();
    this.justPressedState = new Map();
    this.justReleasedState = new Map();

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    for (const [action, keys] of this.bindings.entries()) {
      if (keys.includes(event.code)) {
        if (!this.inputState.get(action)) {
          this.justPressedState.set(action, true);
        }
        this.inputState.set(action, true);
      }
    }
  };

  handleKeyUp = (event) => {
    for (const [action, keys] of this.bindings.entries()) {
      if (keys.includes(event.code)) {
        this.inputState.set(action, false);
        this.justReleasedState.set(action, true);
      }
    }
  };

  isPressed(action) {
    return !!this.inputState.get(action);
  }

  isJustPressed(action) {
    return !!this.justPressedState.get(action);
  }

  isJustReleased(action) {
    return !!this.justReleasedState.get(action);
  }

  bindKey(action, keys) {
    if (Array.isArray(keys)) {
      this.bindings.set(action, keys);
    } else {
      this.bindings.set(action, [keys]);
    }
  }

  unbindAction(action) {
    this.bindings.delete(action);
    this.inputState.delete(action);
    this.justPressedState.delete(action);
    this.justReleasedState.delete(action);
  }

  update() {
    this.justPressedState.clear();
    this.justReleasedState.clear();
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.bindings.clear();
    this.inputState.clear();
    this.justPressedState.clear();
    this.justReleasedState.clear();
  }
}

export default new Controls();
