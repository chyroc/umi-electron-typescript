import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { promises as fs } from 'fs'
import path from 'path'

ipcMain.on('open-dir-select-dialog', (event, arg) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory', 'multiSelections'],
    })
    .then(files => {
      if (files) {
        event.sender.send('dir-selectd', files);
      }
    });
});

const walk = async (dir: string) => {
  const origin = await fs.readdir(dir);

  let files: string[] = []

  await Promise.all(origin.map(async file => {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await walk(filePath)
    } else if (stats.isFile()) {
      files.push(filePath)
    }
  }))

  return files
}

ipcMain.on('scan-dir', (event, dirs: string[]) => {
  (dirs || []).forEach(async dir => {
    const files = await walk(dir)
    console.log('dir', dir, files)
    // fs.readdir(dir, (err, files) => {
    //   console.log('files', dir, files)
    // })
  })
});

function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 并且为你的应用加载index.html
  // win.loadFile('index.html')
  win.loadURL('http://localhost:8000');

  // 打开开发者工具
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
