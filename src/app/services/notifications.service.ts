import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '../components/alerts/alerts.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private $notification: Subject<Alert> = new Subject();
  public notifications: Observable<Alert> = this.$notification.asObservable();

  constructor() {}

  showError(alert: Alert | Error, message?: string) {
    alert = {
      message: message || alert.message,
      type: 'danger',
    };
    this.$notification.next(alert);
  }

  showSuccess(message: string) {
    var alert: Alert = {
      type: 'success',
      message,
    };
    this.$notification.next(alert);
  }
}
