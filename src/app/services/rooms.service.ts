import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedData } from '../interfaces/paginated-data';
import { NotificationsService } from './notifications.service';
import { ProjectsService } from './projects.service';

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

  constructor(
    private http: HttpClient,
    private _toast: NotificationsService,
    private _projects: ProjectsService
  ) {}

  setRooms(rooms: Room[]) {
    this.rooms$.next(rooms);
  }

  getRooms(offset: number, limit: number, filter?: string | number) {
    offset = offset ? offset : 0;
    limit = limit || 10;
    let query = new URLSearchParams(`offset=${offset}&limit=${limit}`);
    if (filter) query.append('filter', `${filter}`);
    let projectId = this._projects.project;
    return this.http.get<PaginatedData<Room>>(
      `${this.uri}/projects/${projectId}/rooms?${query.toString()}`
    );
  }

  invokeRooms() {
    this.http.get(this.uri + '/rooms').subscribe((rooms: Room[]) => {
      this.setRooms(rooms);
    });
  }

  addRoom(room: Room) {
    this.http.post(this.uri + '/rooms', room).subscribe((addedRoom: Room) => {
      let Rooms = this.rooms$.getValue();
      Rooms.push(addedRoom);
      this.rooms$.next(Rooms);
      return;
    }, console.log);
  }

  deleteRoom(id: number) {
    this.http.delete(this.uri + '/rooms/' + id).subscribe((res: any) => {
      if (res.deleted > 0) {
        let Rooms = this.rooms$.getValue().filter((val) => val.id != id);
        this.rooms$.next(Rooms);
      }
      return;
    }, console.log);
  }

  editRoom(room: Room) {
    this.http
      .post(this.uri + '/rooms/update', { room })
      .subscribe((res: any[]) => {
        if (res.length > 0 && res[0] > 0)
          this._toast.showSuccess(`Room ${room.name} ha sido actualizado`);
      });
  }

  getMobileUri(id) {
    return this.http
      .get(this.uri + '/rooms/' + id + '/mobile')
      .toPromise()
      .then((res: any) => {
        localStorage.setItem('mtk', res.mobileToken);
        return localStorage.getItem('mtk');
      });
  }

  createMobileUrl(id) {
    return new Promise((resolve, reject) => {
      if (!!localStorage.getItem('mtk')) {
        return resolve(
          `${environment.mobileUri}/?room=${id}&tk=${localStorage.getItem(
            'mtk'
          )}`
        );
      } else {
        this.getMobileUri(id).then((tk) => {
          return resolve(`${environment.mobileUri}/?room=${id}&tk=${tk}`);
        });
      }
    });
  }
}
