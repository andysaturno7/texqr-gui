import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron.service';
import { Room } from './rooms.service';

export interface System {
  id: number | string;
  address: string;
  name: string;
  room: Room;
}

@Injectable({
  providedIn: 'root',
})
export class SystemsService {
  private systems$: BehaviorSubject<System[]> = new BehaviorSubject([]);
  public systems: Observable<System[]> = this.systems$.asObservable();

  constructor(private _electron: ElectronService) {}

  setSystems(systems: System[]) {
    this.systems$.next(systems);
  }

  getSystems() {
    this._electron
      .invoke('get_systems', null)
      .then((data: System[]) => {
        this.setSystems(data);
      })
      .catch((err) => console.error(err));
  }
}
