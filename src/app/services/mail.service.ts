import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { NotificationsService } from './notifications.service';
import { Registrant } from './registrants.service';
import { ProjectsService } from './projects.service';

export interface addressObject {
  name: string;
  address: string;
}

export interface mailSetUp {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
}

export interface mailRequestBody {
  mail: mailSetUp;
  data: any;
  ProjectId: string;
}

@Injectable({
  providedIn: 'root',
})
export class MailService {
  uriServer: string = environment.uri;
  limitBulk = 10;

  constructor(
    private http: HttpClient,
    private _not: NotificationsService,
    private _project: ProjectsService
  ) {}

  sendMail(options: { address: string; data: any; subject?: string }) {
    let mailSetUp: mailSetUp = {
      to: options.address,
    };
    if (!!options.subject) mailSetUp['subject'] = options.subject;
    var mail: mailRequestBody = {
      data: options.data,
      mail: mailSetUp,
      ProjectId: this._project.project.id,
    };
    return this.http.post(this.uriServer + '/mail/send', mail).subscribe(
      (res: any) => {
        if (res.info.rejected.length > 0) {
          this._not.showError({
            type: 'danger',
            message: `El envio a ${options.data.firstName} no se ha completado`,
          });
        } else {
          this._not.showSuccess(
            `Mensaje enviado satisfactoriamente a ${options.data.firstName}`
          );
        }
      },
      (error) => {
        console.log({ error });

        this._not.showError(error, error?.syscall + ' code: ' + error?.code);
      }
    );
  }

  sendRegistrantBulkMail(registrants: Registrant[]) {
    if (registrants.length > this.limitBulk)
      return this._not.showError(
        new Error(
          `Solo se admite un máximo de ${this.limitBulk} envios de correo al mismo tiempo.`
        )
      );
    return Promise.all(
      registrants.map((registrant) =>
        this.sendMail({
          address: registrant.email,
          data: { registrant },
        })
      )
    );
  }
}
