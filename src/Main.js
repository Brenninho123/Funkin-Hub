import path from 'path';
import Paths from './backend/Paths.js';

class FunkinHub {
  constructor() {
    this.version = '1.0.0';
    this.config = {};
    this.paths = Paths;
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

  run() {
    if (!this.isInitialized) {
      return;
    }

    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML = `<h1>Funkin' Hub v${this.version}</h1>`;
    }
  }
}

const app = new FunkinHub();

(async () => {
  await app.init();
  app.run();
})();

export default FunkinHub;
