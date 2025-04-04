import { app, BrowserWindow} from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('C:/Users/User/Desktop/Pixly/frontend/dist/index.html')
}

app.whenReady().then(() => {
  createWindow()
})