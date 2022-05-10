import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { NotificationsService } from './notifications.service';
import { Registrant } from './registrants.service';

export interface addressObject {
  name: string;
  address: string;
}

export interface mailSetUp {
  from?: string | addressObject;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface mailBody {
  mail: mailSetUp;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MailService {
  uriServer: string = environment.uri;

  user = {
    name: 'Refri Américas 2021',
    address: 'no-reply@tex.cr',
  };
  from = this.user;
  limitBulk = 10;

  constructor(private http: HttpClient, private _not: NotificationsService) {}

  sendMail(address: string, data: any, subject: string) {
    var mail: mailBody = {
      data: {
        registrant: data,
      },
      mail: {
        to: address,
        subject,
      },
    };
    return this.http.post(this.uriServer + '/mail/send', mail).subscribe(
      (res: any) => {
        if (res.info.rejected.length > 0) {
          this._not.showError({
            type: 'danger',
            message: `El envio a ${data.firstName} se ha completado`,
          });
        } else {
          this._not.showSuccess(
            `Mensaje enviado satisfactoriamente a ${data.firstName}`
          );
        }
      },
      (error) => {
        console.log({ error });

        this._not.showError(error, error?.syscall + ' code: ' + error?.code);
      }
    );
  }

  sendRegistrantBulkMail(registrants: Registrant[]){
    if(registrants.length > this.limitBulk) return this._not.showError(new Error(`Solo se admite un máximo de ${this.limitBulk} envios de correo al mismo tiempo.`))
    return Promise.all(registrants.map((registrant=>this.sendMail(registrant.email, registrant, `Registro al Evento.`))));
  }
}
