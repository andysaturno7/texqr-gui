import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'rooms-options',
  templateUrl: './rooms-options.component.html',
  styleUrls: ['./rooms-options.component.css'],
})
export class RoomsOptionsComponent {
  params: any;

  agInit(params: ICellRendererParams) {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    this.params = params;
  }

  editItem() {
    this.params.context.componentParent.editItem(this.params.data.id);
  }

  deleteItem() {
    this.params.context.componentParent.deleteItem(this.params.data.id);
  }
}
