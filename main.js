var path = require('path');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
var electron = require('electron');

function edgesetting(){

  var edge = require('electron-edge-js');
  console.log(edge);
  var testmethod = edge.func({
    assemblyFile: "./cs/StructuralLibrary.dll",
    typeName: "StructuralLibrary.Class1",
    methodName: "Invoke"
    // dotnet core version = 1.1
  });

}

edgesetting();

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
process.env.EDGE_APP_ROOT = path.join(__dirname, 'cs');

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

// function showMessageBox() {
//   const { dialog } = require('electron')
//   var win = mainWindow
//   var options = {
//       type: 'info',
//       buttons: ['OK', 'test', 'Cancel', 'sample', 'Yes', 'No'],
//       title: 'title',
//       message: 'message',
//       detail: 'detailed message'
//   };
  
//   dialog.showMessageBox(win, options);
// }

// (function(){

//   function testfunc(_filepath) {

//     console.log(_filepath);
//     var a = testmethod(99, true);
//     console.log(a);
//   }

//   mainWindow.commonLib = mainWindow.commonLib|| {};
//   mainWindow.commonLib.testfunc = testfunc;

// })();

globalaaa = 999; 
exports.globalaaa = this.globalaaa;

function StartAnalysis(_filepath_){
  // edgesetting();
  

  if (_filepath_ == null){
      alert("=== no file specified ===");
  }
  else{
      console.log(_filepath_);
      // var a = testmethod(10, true);
      console.log(this.globalaaa);
  }
}



