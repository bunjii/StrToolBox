const electron = require('electron');
const path = require('path');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
const url = require('url');

var edge = require('electron-edge-js');

var add7 = edge.func({
  assemblyFile: "./cs_lib/StructuralTools.dll", 
  typeName: "TestConnection.Startup"
});

var helloWorld = edge.func(function () {/*
  async (input) => {
      return ".NET Welcomes " + input.ToString();
  }
*/});


const { app, BrowserWindow, Menu } = electron;
let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    },
    width: 1800,
    height: 1000
    // ,alwaysOnTop: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu);
});

const mainMenuTemplate = [
  {
    label: 'Devtool',
    accelerator: 'Ctrl+D',
    click() {
      mainWindow.webContents.openDevTools();
    }
  },
  {
    label: 'Reload',
    accelerator: 'Ctrl+R',
    click() {
      mainWindow.reload();
    }
  },
  {
    label: 'Run',
    accelerator: 'F5',
    click() {
      add7(12, function(error, result){
        if (error) throw error;
        console.log(result);

      });
    }
  }
];