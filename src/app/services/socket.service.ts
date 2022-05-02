import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { AsistanceService } from './asistance.service';
import { RegistrantsService } from './registrants.service';
import { RoomsService } from './rooms.service';
import { SystemsService, System } from './systems.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  message: Subject<any> = new Subject();

  constructor(
    private _registrants: RegistrantsService,
    private _asistance: AsistanceService,
    private _systems: SystemsService,
    private _rooms: RoomsService,
    private socket: Socket
  ) {
    this.socket.emit('connect_client', {
      name: 'localMachine',
      room: 'globalRoom',
    });
    this.socket.on('updated_registrant', (data: any) => {
      this._registrants.setRegistrants(data.data);
    });
    this.socket.on('dropped_registrants', () => {
      this._registrants.setRegistrants({
        data: [],
        count: 0,
        limit: 0,
        offset: 0,
      });
    });
    this.socket.on('updated_asistance', (data: any) => {
      // this._asistance.setData(data);
    });
    this.socket.on('dropped_asistance', () => {
      // this._asistance.setData(null);
    });
    this.socket.on('updated_systems', (data: any) => {
      this._systems.setSystems(data.systems);
    });
    this.socket.on('updated_rooms', (data: any) => {
      // console.log('rooms Updated: ' + data);
    });
    this.socket.on('updated_registrants_dynamics', (data: any) => {
      // console.log({ data });
    });
  }
}
