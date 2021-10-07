import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {}

  setRooms(rooms: Room[]) {
    this.rooms$.next(rooms);
  }

  get getRooms() {
    return this.rooms$.getValue();
  }

  invokeRooms() {
    this.http.get(this.uri + '/rooms').subscribe((rooms: Room[]) => {
      this.setRooms(rooms);
    });
  }

  addRoom(room: Room) {
    this.http.post(this.uri + '/rooms', room).subscribe((addedRoom: Room) => {
      return;
    }, console.log);
  }

  deleteRoom(id: number) {
    console.log(id);

    this.http
      .delete(this.uri + '/rooms/' + id)
      .subscribe(console.log, console.log);
  }

  createMobileUrl(id) {
    return this.http
      .get(this.uri + '/rooms/' + id + '/mobile')
      .toPromise()
      .then((res: any) => {
        return `${environment.mobileUri}/?room=${res.roomId}&tk=${res.mobileToken}`;
      });
  }
}
