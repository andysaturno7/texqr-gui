import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iSender } from '../../sender.service';
import { Stored } from 'src/app/models/utils.types';

@Component({
  selector: 'texqr-list-sender',
  templateUrl: './list-sender.component.html',
  styleUrls: ['./list-sender.component.css'],
})
export class ListSenderComponent implements OnInit {
  @Input('senders') senders: Stored<iSender>[];
  @Output('delete') delete: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
