import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { NotificationsService } from './notifications.service';

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
    name: 'Remitente',
    address: 'no-reply@tex.cr',
  };
  from = this.user;

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
    return this.http
      .post(this.uriServer + '/mail/send', mail)
      .subscribe((res: any) => {
        if (res.info.rejected.length > 0) {
          this._not.showError({
            type: 'danger',
            message: `El envio no a ${data.firstName} se ha completado`,
          });
        } else {
          this._not.showSuccess(
            `Mensaje enviado satisfactoriamente a ${data.firstName}`
          );
        }
      }, this._not.showError);
  }
}
