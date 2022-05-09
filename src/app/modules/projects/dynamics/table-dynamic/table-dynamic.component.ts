import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'table-dynamic',
  templateUrl: './table-dynamic.component.html',
  styleUrls: ['./table-dynamic.component.css'],
})
export class TableDynamicComponent implements OnInit {
  dynamics: Dynamic[];
  dynamicsSubscription: Subscription;

  @Output('delete') deleteEvent: EventEmitter<number | string> =
    new EventEmitter();

  constructor(
    private _registrants: RegistrantsService,
    private _toast: NotificationsService
  ) {}

  ngOnInit(): void {
    this._registrants.getDynamics();
    this._registrants.dynamics.subscribe((dynamics) => {
      this.dynamics = dynamics;
    }, this._toast.showError);
  }

  launchDeleteEvent(id: number | string) {
    this.deleteEvent.emit(id);
  }
}
