import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true,
      contentSecurityPolicy: `
        default-src 'self';
        connect-src 'self' http://localhost:8000 ws://localhost:3001;
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        script-src 'self';
      `
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ipcMain.handle('save-image', async (event, { name, buffer }) => {
  const destFolder = path.join(app.getPath('pictures'), 'Pixly');
  
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }

  const destPath = path.join(destFolder, name);
  
  try {
    await fs.promises.writeFile(destPath, Buffer.from(buffer));
    const stats = await fs.promises.stat(destPath);
    
    // Return the full image data
    const imageBuffer = await fs.promises.readFile(destPath);
    const base64 = imageBuffer.toString('base64');
    const ext = path.extname(destPath).slice(1);
    
    return {
      name,
      path: destPath,
      src: `data:image/${ext};base64,${base64}`,
      size: (stats.size / (1024 * 1024)).toFixed(2),
      createdAt: stats.birthtime
    };
  } catch (err) {
    console.error('Save failed:', err);
    throw err;
  }
});


ipcMain.handle('get-saved-images', async () => {
  const folderPath = path.join(app.getPath('pictures'), 'Pixly');

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs.readdirSync(folderPath);

  const imageFiles = files.filter(file =>
    /\.(png|jpe?g|gif|bmp|webp)$/i.test(file)
  );

  const fullImageData = imageFiles.map(file => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);
    const ext = path.extname(fullPath).slice(1);
    const imageBuffer = fs.readFileSync(fullPath);
    const base64 = imageBuffer.toString('base64');
    const src = `data:image/${ext};base64,${base64}`;

    return {
      name: file,
      path: fullPath,
      src,
      size: (stats.size / (1024 * 1024)).toFixed(2), // in MB
      createdAt: stats.birthtime, // or stats.ctime
    };
  });

  return fullImageData;
});


ipcMain.handle('delete-image', async (event, fullPath) => {
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return { success: true };
    }
    return { success: false, error: 'File not found' };
  } catch (err) {
    return { success: false, error: err.message };
  }
});