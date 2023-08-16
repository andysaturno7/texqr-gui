import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedData } from '../interfaces/paginated-data';
import { Asistance } from './asistance.service';
import { NotificationsService } from './notifications.service';
import { ProjectsService } from './projects.service';

import { ExportToCSV } from '@molteni/export-csv';
import { AuthenticationService } from '../modules/authentication/authentication.service';
import { RegistrantsService } from './registrants.service';

export interface Room {
  id?: number;
  name: string;
  capacity?: number;
  isDefaultRoom: boolean;
  clientSystems?: any[];
  Registrants?: any[];
  Asistances?: any[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  uri: string = environment.uri;
  private rooms$: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  public rooms: Observable<Room[]> = this.rooms$.asObservable();

  private exportToCsv = new ExportToCSV();

  constructor(
    private http: HttpClient,
    private _toast: NotificationsService,
    private _projects: ProjectsService,
    private _auth: AuthenticationService,
    private _reg: RegistrantsService
  ) {}

  setRooms(rooms: Room[]) {
    this.rooms$.next(rooms);
  }

  getRooms(page: number, limit: number, filter?: string | number) {
    page = page ? page : 0;
    limit = limit || 10;
    let offset = limit * page;
    let query = new URLSearchParams(`offset=${offset}&limit=${limit}`);
    if (filter) query.append('filter', `${filter}`);
    return this.http.get<PaginatedData<Room>>(
      `${this.uri}/projects/${this._projects.project.id}/rooms?${query}`
    );
  }

  invokeRooms() {
    this.http
      .get(`${this.uri}/projects/${this._projects.project.id}/rooms`)
      .subscribe((rooms: PaginatedData<Room>) => {
        this.setRooms(rooms.data);
      });
  }

  addRoom(room: Room) {
    this.http
      .post(`${this.uri}/projects/${this._projects.project.id}/rooms`, room)
      .subscribe((addedRoom: Room) => {
        let Rooms = this.rooms$.getValue();
        Rooms.push(addedRoom);
        this.rooms$.next(Rooms);
        return;
      }, console.log);
  }

  deleteRoom(id: number | string) {
    this.http
      .delete(`${this.uri}/projects/${this._projects.project.id}/rooms/${id}`)
      .subscribe((res: any) => {
        if (res.deleted > 0) {
          let Rooms = this.rooms$.getValue().filter((val) => val.id != id);
          this.rooms$.next(Rooms);
        }
        return;
      }, console.log);
  }

  editRoom(room: Room) {
    this.http
      .post(`${this.uri}/projects/${this._projects.project.id}/rooms/update`, {
        room,
      })
      .subscribe((res: any[]) => {
        if (res.length > 0 && res[0] > 0)
          this._toast.showSuccess(`Room ${room.name} ha sido actualizado`);
      });
  }

  getAsistances(room: Room) {
    this.http
      .get(
        `${this.uri}/projects/${this._projects.project.id}/rooms/${room.id}/asistance`
      )
      .subscribe((res: Asistance[]) => {
        let dataModified = [];
        res.forEach((row) => {
          let registrant = row.Registrant;
          delete row.Registrant;
          let dynamics = JSON.parse(registrant.dynamics);
          delete registrant.dynamics;
          let date = new Date(row.joinTime);
          registrant['time'] = date.toLocaleTimeString();
          registrant['date'] = date.toLocaleDateString();
          dataModified.push({ ...row, ...registrant, ...dynamics });
        });
        if (dataModified.length > 0) {
          // descargar
          let columns = ['firstName', 'lastName', 'email', 'time', 'date'];

          let dynamics = this._reg.getDynamicsValue();
          dynamics.forEach((dynamic) => {
            columns.push(dynamic.field);
          });

          this.exportToCsv.exportColumnsToCSV(
            dataModified,
            room.name + '_asistencias',
            columns
          );
          this._toast.showSuccess('Archivo Descargado.');
        } else {
          this._toast.showError(
            new Error(`${room.name} no tiene asistencias.`)
          );
        }
      });
  }

  getMobileUri(id) {
    return this.http
      .get(
        this.uri +
          '/projects/' +
          this._projects.project.id +
          '/rooms/' +
          id +
          '/mobile'
      )
      .toPromise()
      .then((res: any) => {
        localStorage.setItem('mtk', res.mobileToken);
        return localStorage.getItem('mtk');
      });
  }

  createMobileUrl(id) {
    return new Promise<string>((resolve, reject) => {
      let tk = this._auth.getLoggedUser().token;
      return resolve(
        `${environment.mobileUri}/?room=${id}&project=${this._projects.project.id}&tk=${tk}`
      );
    });
  }
}
