import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  constructor() {}

  setSystems(systems: System[]) {
    this.systems$.next(systems);
  }

  getSystems() {
    return;
  }
}
