const notifier = require('node-notifier');

export class ListenEvent {
    constructor() {
        this.ipcMain = require('electron').ipcMain;
        this.listenEvent();
    }

    listenEvent() {
        this.ipcMain.on('newMsg', (e, msg) => {
            console.log("nes msg", msg);
            notifier.notify({
                title: `De ${msg.member}`,
                message: msg.msg,
                sound: true
              });
        });
    }
}

//module.exports.ListenEvent;