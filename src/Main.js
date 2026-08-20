import Paths from './backend/Paths.js';
import Controls from './backend/Controls.js';
import CodeManager from './backend/system/Code.js';
import Input from './ui/Input.js';
import IntroState from './states/IntroState.js';

class FunkinHub {
  constructor() {
    this.version = '1.0.0';
    this.config = {};
    this.paths = Paths;
    this.controls = Controls;
    this.codeManager = CodeManager;
    this.input = Input;
    
    this.currentState = null;
    this.isInitialized = false;
    this.isRunning = false;
    
    this.lastTime = 0;
    this.deltaTime = 0;
  }

  async init() {
    try {
      this.setupErrorHandling();
      await this.loadConfig();
      await this.setupAssets();
      this.initCodeSystem();
      
      this.isInitialized = true;
    } catch (error) {}
  }

  setupErrorHandling() {
    window.addEventListener('error', () => {});
    window.addEventListener('unhandledrejection', () => {});
  }

  initCodeSystem() {
    this.codeManager.clear();
  }

  async loadConfig() {
    const configPath = this.paths.getDataPath('config.json');
    
    try {
      const response = await fetch(configPath);
      if (response.ok) {
        this.config = await response.json();
      } else {
        this.config = this.getDefaultConfig();
      }
    } catch (error) {
      this.config = this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      theme: 'dark',
      debug: true,
      defaultEngine: 'PsychEngine',
      fpsCap: 60
    };
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
    if (!this.isInitialized || this.isRunning) return;

    this.isRunning = true;
    this.switchState(new IntroState(this));

    this.lastTime = performance.now();
    requestAnimationFrame(this.gameLoop);
  }

  gameLoop = (currentTime) => {
    if (!this.isRunning) return;

    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(this.deltaTime);

    requestAnimationFrame(this.gameLoop);
  };

  update(dt) {
    if (this.currentState && typeof this.currentState.update === 'function') {
      this.currentState.update(dt);
    }

    this.controls.update();
    this.input.update();
  }
}

const app = new FunkinHub();

(async () => {
  await app.init();
  app.run();
})();

export default FunkinHub;
