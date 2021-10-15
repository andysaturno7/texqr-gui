import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';

export interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];
  subscAlerts: Subscription;

  constructor(private _not: NotificationsService) {
    this.subscAlerts = _not.notifications.subscribe(
      (res) => {
        this.alerts.push(res);
        setTimeout(() => {
          this.alerts.shift();
        }, 3000);
      },
      (err) => {}
    );
  }

  ngOnInit(): void {}
}
