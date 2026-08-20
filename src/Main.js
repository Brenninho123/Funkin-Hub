import fs from 'fs';
import path from 'path';

class FunkinHub {
  constructor() {
    this.version = '1.0.0';
    this.config = {};
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
    const configPath = path.resolve(process.cwd(), 'config.json');
    
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf-8');
      this.config = JSON.parse(rawData);
    } else {
      this.config = {
        theme: 'dark',
        debug: true,
        defaultEngine: 'PsychEngine'
      };
    }
  }

  async setupAssets() {
    const directories = ['./assets', './mods', './data'];
    
    directories.forEach((dir) => {
      const dirPath = path.resolve(process.cwd(), dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });
  }

  run() {
    if (!this.isInitialized) {
      return;
    }
  }
}

const app = new FunkinHub();

(async () => {
  await app.init();
  app.run();
})();

export default FunkinHub;
