import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { iUser } from '../../users.service';
import { PaginatedData } from 'src/app/interfaces/paginated-data';

@Component({
  selector: 'user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input('users') userData: PaginatedData<iUser>;

  @Output('deleteItemCommand') deleteCommandEvent = new EventEmitter<string>();
  @Output('editItemCommand') editCommandEvent = new EventEmitter<string>();

  columnMode = ColumnMode;
  selectionType = SelectionType;

  selected = [];
  constructor() {}

  ngOnInit(): void {}
  onSelect(event) {}
  onPage(event) {}
  editItem(id: string) {
    this.editCommandEvent.emit(id);
  }
  deleteItem(id: string) {
    this.deleteCommandEvent.emit(id);
  }
}
