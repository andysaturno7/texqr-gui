import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from './rooms.service';
import { environment } from '../../environments/environment';

export interface Registrant {
  id?: number | string;
  firstName: string;
  lastName?: string;
  code?: string | number;
  email: string;
  company?: string;
  country?: string;
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
      country: 'Costa Rica',
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

  private registrants$: BehaviorSubject<Registrant[]> = new BehaviorSubject(
    this.sampleRegistrant
  );
  public registrants: Observable<Registrant[]> =
    this.registrants$.asObservable();

  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = environment.uri;
    http.get(this.uri + '/registrants').subscribe((res: Registrant[]) => {
      this.setRegistrants(res);
    }, console.log);
  }

  setRegistrants(registrants: Registrant[]) {
    this.registrants$.next(registrants);
  }

  addOne(registrant: Registrant) {
    this.http
      .post(this.uri + '/registrants', registrant)
      .subscribe((res: Registrant) => {}, console.log);
  }

  update(registrants: Registrant) {
    this.http
      .post(this.uri + '/registrants/update', registrants)
      .subscribe(console.log, console.log);
  }

  deleteOne(id: number) {
    this.http.delete(this.uri + '/registrants/' + id).subscribe(console.log),
      console.log;
  }

  import(file: File) {
    const formdata = new FormData();
    formdata.append('import', file);
    this.http
      .post(this.uri + '/registrants/import', formdata)
      .subscribe(console.log, console.log);
    return;
  }

  drop() {
    this.http
      .delete(this.uri + '/registrants/all')
      .subscribe(console.log, console.log);
    return;
  }
}
