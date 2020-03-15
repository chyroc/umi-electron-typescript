'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var electron_1 = require('electron');
electron_1.ipcMain.on('open-dir-select-dialog', function(event, arg) {
  electron_1.dialog
    .showOpenDialog({
      properties: ['openDirectory', 'multiSelections'],
    })
    .then(function(files) {
      if (files) {
        event.sender.send('dir-selectd', files);
      }
    });
});
function createWindow() {
  // 创建浏览器窗口
  var win = new electron_1.BrowserWindow({
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
electron_1.app.whenReady().then(createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function() {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    electron_1.app.quit();
  }
});
electron_1.app.on('activate', function() {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (electron_1.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
//# sourceMappingURL=index.js.map
