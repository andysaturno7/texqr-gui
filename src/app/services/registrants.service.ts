import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron.service';
import { Room } from './rooms.service';

export interface Registrant {
  id?: number | string;
  firstName: string;
  lastName?: string;
  code?: string | number;
  email: string;
  company?: string;
  chair?: number;
  connected: number;
  Rooms?: Room[];
}

@Injectable({
  providedIn: 'root',
})
export class RegistrantsService {
  sampleRegistrant: Registrant[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      code: '556541',
      email: 'jdoe@mail.com',
      connected: 0,
      chair: 21,
      Rooms: [
        { name: 'defaultRoom', capacity: 100, isDefaultRoom: true },
        { name: 'Sala 1', capacity: 50, isDefaultRoom: false },
        { name: 'Sala 2', capacity: 50, isDefaultRoom: false },
        { name: 'Sala 3', capacity: 50, isDefaultRoom: false },
      ],
    },
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      code: '556541ecg',
      email: 'jdoe@mail.com',
      connected: 0,
    },
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      code: 'poiiy556541',
      email: 'jdoe@mail.com',
      connected: 0,
    },
  ];

  private registrants$: BehaviorSubject<any> = new BehaviorSubject(
    this.sampleRegistrant
  );
  public registrants: Observable<any> = this.registrants$.asObservable();

  constructor(private _electron: ElectronService) {
    if (_electron.isElectron()) {
      _electron.invoke('get_registrants', null).then((res) => {
        let result = [];
        res.forEach((element) => {
          if (element.dataValues) {
            result.push(element.dataValues);
          } else {
            result.push(element);
          }
        });
        this.setRegistrants(result);
      });
    }
  }

  setRegistrants(registrants: any) {
    this.registrants$.next(registrants);
  }

  addOne(registrant: any) {
    this._electron.invoke('add_registrant', registrant);
  }

  update(registrants: any) {
    this._electron.invoke('update_registrants', registrants);
  }

  deleteOne(id: number) {
    this._electron.invoke('delete_registrant', id);
  }

  import() {
    this._electron.launchImport();
  }

  drop() {
    this._electron.invoke('drop_registrants', null);
  }
}
