import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AsistanceService } from './asistance.service';
import { ElectronService } from './electron.service';
import { RegistrantsService } from './registrants.service';
import { RoomsService } from './rooms.service';
import { SystemsService, System } from './systems.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  message: Subject<any> = new Subject();
  uriServer: string = 'http://127.0.0.1:5050';

  constructor(
    private _registrants: RegistrantsService,
    private _asistance: AsistanceService,
    private _systems: SystemsService,
    private _rooms: RoomsService
  ) {
    if ((<any>window).require) {
      var io = (<any>window).require('socket.io-client');
      this.socket = io(this.uriServer);
      this.socket.emit('connect_client', {
        name: 'localMachine',
        room: 'globalRoom',
      });
      this.socket.on('welcome', (data: any) => {
        alert(data.message);
      });
      this.socket.on('updated_registrant', (data: any) => {
        let asistData = this._asistance.getData();
        asistData.total = data.length;
        this._asistance.setData(asistData);
        this._registrants.setRegistrants(data);
      });
      this.socket.on('dropped_registrants', () => {
        let asistData = this._asistance.getData();
        asistData.total = 0;
        this._asistance.setData(asistData);
        this._registrants.setRegistrants(null);
      });
      this.socket.on('updated_asistance', (data: any) => {
        this._asistance.setData(data);
      });
      this.socket.on('dropped_asistance', () => {
        this._asistance.setData(null);
      });
      this.socket.on('updated_systems', (data: any) => {
        this._systems.setSystems(data.systems);
      });
      this.socket.on('updated_rooms', (data: any) => {
        console.log('rooms Updated: ' + data);
      });
    }
  }

  getUriServer() {
    return this.uriServer;
  }
}
