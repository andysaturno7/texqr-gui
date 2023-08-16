import { Component, OnInit } from '@angular/core';
import { SenderService, iSender } from '../../sender.service';
import { Stored } from 'src/app/models/utils.types';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'texqr-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  senders: Stored<iSender>[];

  constructor(
    private _sender: SenderService,
    private _not: NotificationsService
  ) {}

  ngOnInit(): void {
    this._sender.getSenders().subscribe((res) => {
      this.senders = res;
    }, this._not.showError);
  }

  onDelete(id: string) {
    this._sender.deleteOne(id).subscribe((res) => {
      this._not.showSuccess('Elemento eliminado');
      this.ngOnInit();
    }, console.log);
  }
}
