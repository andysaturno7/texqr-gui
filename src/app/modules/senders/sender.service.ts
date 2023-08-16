import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stored } from 'src/app/models/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SenderService {
  private uri = environment.uri;
  constructor(private http: HttpClient) {}

  getSenders() {
    return this.http.get<Stored<iSender>[]>(`${this.uri}/senders`);
  }

  createSender(sender: iSender) {
    return this.http.post(`${this.uri}/senders`, sender);
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.uri}/senders/${id}`);
  }
}

export interface iSender {
  user: string;
  password: string;
  name: string;
  host: string;
  port: number;
}
