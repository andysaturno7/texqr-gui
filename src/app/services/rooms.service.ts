import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron.service';

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
  private rooms$: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  public rooms: Observable<Room[]> = this.rooms$.asObservable();

  constructor(private _electron: ElectronService) {
    if (_electron.isElectron()) {
      this.invokeRooms();
    }
  }

  setRooms(rooms: Room[]) {
    this.rooms$.next(rooms);
  }

  get getRooms() {
    return this.rooms$.getValue();
  }

  invokeRooms() {
    if (this._electron.isElectron()) {
      this._electron.invoke('get_rooms', null).then((rooms: Room[]) => {
        this.rooms$.next(rooms);
      });
    }
  }

  addRoom(room){
    if(this._electron.isElectron()){
      return this._electron.invoke('add_room', room);
    }
  }
}
