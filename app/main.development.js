/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { Menu } from 'electron';
import menubar from 'menubar';

// importing globals to avoid requiring them in the renderer itself
import DenonClient from 'denon_remote';
import AutoLaunch from 'auto-launch';

global.DenonClient = DenonClient;
global.AutoLaunch = AutoLaunch;

let app = null;
let mb = null;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.info);
};

mb = menubar({
  icon: `${__dirname}/icons/16x16.png`,
  index: `file://${__dirname}/app.html`,
  width: 200,
  height: 300,
  resizable: false,
  preloadWindow: true,
  alwaysOnTop: process.env.NODE_ENV === 'development',
});

mb.on('ready', async () => {
  await installExtensions();
  app = mb.app;
  mainWindow = mb.window;

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(x, y);
          },
        },
      ]).popup(mainWindow);
    });
  }
});
