
const positioner = require('electron-traywindow-positioner');
const showWindow = () => {
  positioner.position(window, tray.getBounds());
  window.show();
};

const {app, BrowserWindow, ipcMain, Tray, nativeImage} = require('electron')
const path = require('path')
const assetsDirectory = path.join(__dirname, 'assets')
let tray = undefined
let window = undefined

function createWindow() {
	// Create the browser window.
    // let image = nativeImage.createEmpty();
	window = new BrowserWindow({ width: (1280/3), height: (720/3),
      fullscreenable: false,
      resizable: true,
   //     skipTaskbar: true,
      show:true,
   //     frame: false,
        transparent: true,
        alwaysOnTop: true,
          minimizable: false,
  maximizable: false,
    //    showWindowIcon: false,
      webPreferences: {
        nodeIntegration: true,
        'overlay-fullscreen-video': true,
        backgroundThrottling: false,
          focusable: false, 
        webSecurity: false
      }
  });

    window.setMenu(null);

    window.once('focus', () => window.flashFrame(false))
window.flashFrame(true)
    var size = window.getSize();
    window.setSize(size[0], parseInt(size[0] * 9 / 16));
 //     window.setSkipTaskbar(true);

    window.on('resize', function () {
  setTimeout(function () {
    var size = window.getSize();
    window.setSize(size[0], parseInt(size[0] * 9 / 16));
  }, 0);
      
});

	// and load the html of the app.
	window.loadFile("./models/holistic/index.html");
    app.dock.hide();

    
window.setOverlayIcon(nativeImage.createFromPath('icon.icns'), 'webcam-ml4max');

	//hidden = new BrowserWindow({ show:false });
	//hidden.loadFile("./models/holistic/index.html");

}

function createTray() {
    tray = new Tray(path.join(__dirname, 'icon.png'))
    tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    tray.on('click', function (event) {
        toggleWindow()
        // Show devtools when command clicked
         if (window.isVisible() && process.defaultApp && event.metaKey) {
          window.openDevTools({mode: 'detach'})
          }
    });
}

const toggleWindow = () => {
  if (window.isVisible()) return window.hide();
  return showWindow();
}


app.on('ready', () => {
  createWindow()
 // createTray();

  const { screen } = require('electron')

      const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.size;
        window.setPosition(parseInt(width-1280/1.5),0);
})


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});
