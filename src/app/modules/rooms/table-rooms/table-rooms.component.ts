import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PageInfo, PaginatedData } from 'src/app/interfaces/paginated-data';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Room, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.css'],
})
export class TableRoomsComponent implements OnInit {
  @Input('data') dataServer: PaginatedData<Room>;
  @Output('page') PageEvent: EventEmitter<any> = new EventEmitter();
  @Output('select') SelectEvent: EventEmitter<any> = new EventEmitter();
  @Output('exportReport') ExportReport: EventEmitter<any> = new EventEmitter();

  selected = [];

  columnMode = ColumnMode;
  selectionType = SelectionType;

  constructor(private _room: RoomsService, private _not: NotificationsService) {}

  ngOnInit(): void {}

  onPage(event: PageInfo) {
    this.PageEvent.emit(event);
  }

  onSelect(event) {
    this.SelectEvent.emit(event);
  }

  onExportReport(room: Room) {
    this.ExportReport.emit(room);
  }

  deleteItem(id) {
    if(confirm("Seguro deseas eliminar este elemento?"))
    this._room.deleteRoom(id);
  }

  editItem(event: any) {}

  exportTable() {}

  async createMobileUrl(roomId: number | string) {    
    let rmurl = await this._room.createMobileUrl(roomId);
    navigator.clipboard.writeText(rmurl);
    this._not.showSuccess("Se ha copiado la url al clip.")
  }
}
