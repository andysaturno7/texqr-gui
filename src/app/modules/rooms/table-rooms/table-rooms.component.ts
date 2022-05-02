import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PageInfo, PaginatedData } from 'src/app/interfaces/paginated-data';
import { Room } from 'src/app/services/rooms.service';

@Component({
  selector: 'table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.css'],
})
export class TableRoomsComponent implements OnInit {
  @Input('data') dataServer: PaginatedData<Room>;
  @Output('page') PageEvent: EventEmitter<any> = new EventEmitter();
  @Output('select') SelectEvent: EventEmitter<any> = new EventEmitter();

  selected = [];

  columnMode = ColumnMode;
  selectionType = SelectionType;

  constructor() {}

  ngOnInit(): void {}

  onPage(event: PageInfo) {
    this.PageEvent.emit(event);
  }

  onSelect(event) {
    this.SelectEvent.emit(event);
  }

  deleteItem(id) {}

  editItem(event: any) {}

  exportTable() {}

  createMobileUrl(roomId: number | string) {}
}
