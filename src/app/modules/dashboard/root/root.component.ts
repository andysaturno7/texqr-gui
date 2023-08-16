import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { System, SystemsService } from 'src/app/services/systems.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  systems: System[] = [];
  systemSubsc: Subscription;

  constructor(
    private _systems: SystemsService,
    private _not: NotificationsService
  ) {}

  ngOnInit(): void {
    this.systemSubsc = this._systems.systems.subscribe(
      (systems) => {
        this.systems = systems;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  copyClipboard(data: string) {
    navigator.clipboard.writeText(data);
    this._not.showSuccess('Texto Copiado');
  }
}
