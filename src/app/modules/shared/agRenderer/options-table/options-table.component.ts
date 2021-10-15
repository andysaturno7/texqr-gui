import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'options-table',
  templateUrl: './options-table.component.html',
})
export class OptionsTableComponent {
  connected: string = 'danger';
  params: any;
  text: string;

  agInit(params: ICellRendererParams | any) {
    this.params = params;
    this.text = params.colDef.text || 'right';
    this.connected = params.data.connected > 0 ? 'success' : 'secondary';
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

  sendEmail() {
    this.params.context.componentParent.sendEmail(this.params.data);
  }

  alert(ctx) {
    alert(ctx);
  }
}
