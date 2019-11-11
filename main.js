var path = require('path');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
var electron = require('electron');

process.env.EDGE_APP_ROOT = path.join(__dirname, 'cs');
var edge = require('electron-edge-js');
// process.env.EDGE_USE_CORECLR = 1;
var testmethod = edge.func({
  assemblyFile: "./cs/StructuralLibrary.dll",
  typeName: "StructuralLibrary.Class1",
  methodName: "Invoke"
}) 
console.log(typeof testmethod);
var test = testmethod(10,true)
console.log(test);

const { app, BrowserWindow, Menu } = electron;
const templateMenu = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'resetzoom',
      },
      {
        role: 'zoomin',
      },
      {
        role: 'zoomout',
      },
      {
        type: 'separator',
      },
      {
        role: 'togglefullscreen',
      }
    ]
  }
];

let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    },
    width: 1800,
    height: 1080
  });

  mainWindow.loadURL(`file://${__dirname}/html/index.html`);

  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);

  mainWindow.openDevTools();
});

function showMessageBox() {
  const { dialog } = require('electron')
  var win = mainWindow
  var options = {
      type: 'info',
      buttons: ['OK', 'test', 'Cancel', 'sample', 'Yes', 'No'],
      title: 'title',
      message: 'message',
      detail: 'detailed message'
  };
  
  dialog.showMessageBox(win, options);
}

function testfunc() {

  // var a = testmethod(12, true);
  var a = {}
  // a.testmethod(12, true);
  // window.alert("test func executed");
  console.log(a);
  
}