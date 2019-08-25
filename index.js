const electron = require('electron');
const path = require('path');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

var edge = require('electron-edge-js');

var add7 = edge.func({
  assemblyFile: "./cs/Sample.dll", 
  typeName: "Structure.Startup"
});

add7(13, function (error, result) {
  if (error) throw error;
  console.log(result);
});

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
});