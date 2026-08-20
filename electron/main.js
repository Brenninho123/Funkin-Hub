import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isAndroid = process.platform === 'android' || process.env.CAPACITOR_PLATFORM === 'android';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: isAndroid,
    frame: !isAndroid,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    }
  });

  if (isAndroid) {
    mainWindow.maximize();
  }

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
}

if (typeof app !== 'undefined' && app.whenReady) {
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
