import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Room } from './rooms.service';
import { environment } from '../../environments/environment';
import { Dynamic } from '../models/dynamic.interface';
import { NotificationsService } from './notifications.service';
import { PaginatedData } from '../interfaces/paginated-data';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from './projects.service';

export interface Registrant {
  id?: number | string;
  firstName: string;
  lastName?: string;
  code?: string | number;
  email: string;
  dynamics?: string | any;
  connected?: number;
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
      Rooms: [
        { name: 'defaultRoom', capacity: 100, isDefaultRoom: true },
        { name: 'Sala 1', capacity: 50, isDefaultRoom: false },
        { name: 'Sala 2', capacity: 50, isDefaultRoom: false },
        { name: 'Sala 3', capacity: 50, isDefaultRoom: false },
      ],
    },
  ];

  private registrants$: BehaviorSubject<PaginatedData<Registrant>> =
    new BehaviorSubject(null);
  public registrants: Observable<PaginatedData<Registrant>> =
    this.registrants$.asObservable();

  private dynamics$: BehaviorSubject<Dynamic[]> = new BehaviorSubject([]);
  public dynamics: Observable<Dynamic[]> = this.dynamics$.asObservable();

  private uri: string;

  constructor(
    private http: HttpClient,
    private _toast: NotificationsService,
    private _projects: ProjectsService
  ) {
    this.uri = environment.uri;
  }

  getRegistrants(page: number, limit: number, filter?: string | number) {
    page = page ? page : 0;
    limit = limit || 10;
    let offset = limit * page;
    let query = new URLSearchParams(`offset=${offset}&limit=${limit}`);
    if (filter) query.append('filter', `${filter}`);
    let projectId = this._projects.project.id;
    return this.http.get<PaginatedData<Registrant>>(
      `${this.uri}/projects/${projectId}/registrants?${query}`
    );
  }

  setRegistrants(registrants: PaginatedData<Registrant>) {
    this.registrants$.next(registrants);
  }

  addOne(registrant: Registrant) {
    return this.http.post<Registrant>(
      this.uri + '/projects/' + this._projects.project.id + '/registrants',
      registrant
    );
  }

  update(registrants: Registrant) {
    this.http
      .post(
        `${this.uri}/projects/${this._projects.project.id}/registrants/update`,
        registrants
      )
      .subscribe(console.log, console.log);
  }

  deleteOne(id: number | string) {
    return this.http.delete(
      `${this.uri}/projects/${this._projects.project.id}/registrants/${id}`
    );
  }

  deleteBulk(registrants: Registrant[]) {
    return this.http.post(
      `${this.uri}/projects/${this._projects.project.id}/registrants/delete`,
      { id: registrants.map((registrant) => registrant.id) }
    );
  }

  join(RegistrantId: string | number, RoomId: string | number) {
    return this.http.post(
      `${this.uri}/projects/${this._projects.project.id}/asistance`,
      { RegistrantId, RoomId }
    );
  }

  getDynamics(): void {
    this.http
      .get(
        this.uri +
          '/projects/' +
          this._projects.project.id +
          '/registrants/dynamics'
      )
      .subscribe((res: Dynamic[]) => {
        this.dynamics$.next(res);
      }, console.log);
  }

  getDynamicsValue() {
    return this.dynamics$.getValue();
  }

  addDynamic(dynamic: Dynamic) {
    this.http
      .post(
        this.uri +
          '/projects/' +
          this._projects.project.id +
          '/registrants/dynamics',
        dynamic
      )
      .subscribe((res: any) => {
        let tDynamics = this.dynamics$.getValue();
        tDynamics.push(res);
        this.dynamics$.next(tDynamics);
      }, console.log);
  }

  deleteDynamic(id: number | string) {
    this.http
      .delete(
        `${this.uri}/projects/${this._projects.project.id}/registrants/dynamics/${id}`
      )
      .subscribe((res: any) => {
        if (res.deleted > 0) {
          let dynamics = this.dynamics$
            .getValue()
            .filter((dynamic, index) => dynamic.id !== id);
          this.dynamics$.next(dynamics);
        }
      }, console.log);
  }

  import(file: File) {
    const formdata = new FormData();
    formdata.append('import', file);
    this.http
      .post(
        this.uri +
          '/projects/' +
          this._projects.project.id +
          '/registrants/import',
        formdata
      )
      .subscribe((res: any) => {
        if (res.status == 'bad_data')
          this._toast.showSuccess(
            `${res.bad_data.length} datos no han sido admitidos`
          );
        console.log({ res });
      }, console.log);
    return;
  }

  drop() {
    this.http
      .delete(this.uri + '/registrants/all')
      .subscribe(console.log, console.log);
    return;
  }
}
