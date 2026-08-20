import path from 'path';
import Paths from './backend/Paths.js';
import IntroState from './states/IntroState.js';

class FunkinHub {
  constructor() {
    this.version = '1.0.0';
    this.config = {};
    this.paths = Paths;
    this.currentState = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      await this.loadConfig();
      await this.setupAssets();
      this.isInitialized = true;
    } catch (error) {
      console.error(error);
    }
  }

  async loadConfig() {
    const configPath = this.paths.getDataPath('config.json');
    
    try {
      const response = await fetch(configPath);
      if (response.ok) {
        this.config = await response.json();
      } else {
        this.config = {
          theme: 'dark',
          debug: true,
          defaultEngine: 'PsychEngine'
        };
      }
    } catch (error) {
      this.config = {
        theme: 'dark',
        debug: true,
        defaultEngine: 'PsychEngine'
      };
    }
  }

  async setupAssets() {
    const rootContainer = document.getElementById('app');
    if (rootContainer) {
      rootContainer.dataset.assetsLoaded = 'true';
    }
  }

  switchState(newState) {
    if (this.currentState && typeof this.currentState.destroy === 'function') {
      this.currentState.destroy();
    }
    this.currentState = newState;
    if (this.currentState && typeof this.currentState.create === 'function') {
      this.currentState.create();
    }
  }

  run() {
    if (!this.isInitialized) {
      return;
    }

    this.switchState(new IntroState(this));
  }
}

const app = new FunkinHub();

(async () => {
  await app.init();
  app.run();
})();

export default FunkinHub;
