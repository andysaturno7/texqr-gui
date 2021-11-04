import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registrant } from './registrants.service';
import { Room } from './rooms.service';

export interface Asistance {
  id?: number;
  joinTime: string;
  leaveTime: string;
  Registrant: Registrant;
  Room: Room;
}

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

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.uri;
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
    this.http.get(this.uri + '/asistance').subscribe((res) => {
      this.setAsistance(res);
    }, console.log);
  }
}
