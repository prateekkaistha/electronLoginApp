const electron = require('electron');
const app = electron.app;

const path = require('path');
const url = require('url');

var toSite = require('./app.js'); 
            
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
var mainWindow;
let addWindow;

var TodaysPilots = [];
var semiFinalList = [];
var semiCount=0;
var count=0;

app.on('ready',function(){
    mainWindow = new BrowserWindow({width: 1024,
    height: 768,
    webPreferences: {nodeIntegration: true}
   });
    //mainWindow.loadURL('https://github.com');
    //mainWindow.loadURL('https://rohtangpermits.nic.in/Home/InformatoryScreen');
    mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),  
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed',function(){
        app.quit();
    });
 const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
 Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
addWindow = new BrowserWindow({
    width: 700, 
    height: 200,
    webPreferences: {nodeIntegration: true},
    title: 'Add Pilot'
});

addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
}));
addWindow.on('close',function(){
    addWindow = null;
})
}
//catch
ipcMain.on('user:add',function(e,user){
    console.log(user);
    semiFinalList[semiCount]=user;
    semiCount++;
    //console.log(TodaysPilots);
     mainWindow.webContents.send('user:add',user);
addWindow.close();
});

ipcMain.on('listTobeSent:final',function(e,listTobeSent,countOfFinal){
toSite.sendnames(listTobeSent,countOfFinal);
});

const mainMenuTemplate = [
  {
      label: 'File',
        submenu:[
            {
                label: 'Add Pilot',
                accelerator: process.platform == 'darwin' ? 'command+N':
                'Ctrl+N',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'quit',
                accelerator: process.platform == 'darwin' ? 'command+Q':
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }  
];


if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Devloper Tools',
        submenu:[
         {
             label: 'Toggle DevTools',
             accelerator: process.platform == 'darwin' ? 'Command + I': 'Ctrl+I',
             click(item,focusedWindow){
                 focusedWindow.toggleDevTools();
             }
         },
         {
            role: 'reload'
         }
        ]
    });
}
