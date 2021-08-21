import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root',
})
export class AsistanceService {
  public sampleData: any[] = [
    {
      id: 456,
      joinTime: 5454,
      leaveTime: 1235,
      Registrant: { firstName: 'Andy', lastName: 'Sanchez' },
    },
  ];

  private data$: BehaviorSubject<any> = new BehaviorSubject(null);
  public data: Observable<any> = this.data$.asObservable();

  private asistance$: BehaviorSubject<any> = new BehaviorSubject(
    this.sampleData
  );
  public asistance: Observable<any> = this.asistance$.asObservable();

  constructor(private _electron: ElectronService, private http: HttpClient) {
    if (_electron.isElectron()) {
      this._electron
        .invoke('get_asistance_count', null)
        .then((res) => {
          this.data$.next(res);
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }
  }

  setData(newData: any) {
    this.data$.next(newData);
  }

  getData() {
    return this.data$.getValue();
  }

  setAsistance(asist: any) {
    this.asistance$.next(asist);
  }

  getAsistance(): void {
    if (this._electron.isElectron()) {
      this._electron
        .invoke('get_asistance', null)
        .then((res: any) => {
          this.setAsistance(res);
        })
        .catch((err: any) => console.error(err));
    }
  }
}
