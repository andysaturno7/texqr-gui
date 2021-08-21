import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'qr-renderer',
  template: `<i
      class="fa fa-qrcode mr-2 text-primary"
      role="button"
      (click)="touchQR()"
    ></i
    >{{ params.value }}`,
  styleUrls: ['./qr-renderer.component.css'],
})
export class QrRendererComponent {
  params: ICellRendererParams;

  agInit(params: ICellRendererParams) {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    this.params = params;
  }

  touchQR() {
    this.params.context.componentParent.QRTouched(this.params.value);
  }
}
