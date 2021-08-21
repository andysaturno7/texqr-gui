import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  electron: any = null;

  constructor() {
    if (this.isElectron()) {
      this.electron = (<any>window).require('electron');
    }
  }

  isElectron(): boolean {
    if ((<any>window).require) {
      return true;
    } else {
      return false;
    }
  }

  getIp() {
    return new Promise((resolve) => {
      this.electron.ipcRenderer.invoke('get_ip').then(resolve);
    });
  }

  launchImport() {
    if (this.isElectron()) {
      this.electron.ipcRenderer.send('launch_import');
    }
  }

  invoke(channel: string, args: any) {
    if (this.isElectron()) {
      return this.electron.ipcRenderer.invoke(channel, args);
    }
  }
}
