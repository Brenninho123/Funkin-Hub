class IntroState {
  constructor(game) {
    this.game = game;
    this.container = null;
  }

  create() {
    this.container = document.createElement('div');
    this.container.id = 'intro-state';
    
    const title = document.createElement('h1');
    title.textContent = "Funkin' Hub";
    
    const subtitle = document.createElement('p');
    subtitle.textContent = "Press Enter to Start";

    this.container.appendChild(title);
    this.container.appendChild(subtitle);

    const app = document.getElementById('app');
    if (app) {
      app.appendChild(this.container);
    }

    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.destroy();
    }
  };

  update() {}

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

export default IntroState;
