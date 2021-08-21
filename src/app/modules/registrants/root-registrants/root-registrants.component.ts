import { Component, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'root-registrants',
  templateUrl: './root-registrants.component.html',
  styleUrls: ['./root-registrants.component.css'],
})
export class RootRegistrantsComponent implements OnInit {
  qrData?: string;
  @ViewChild('qr') private QRComponent: QRCodeComponent;
  renderQR: boolean = false;
  private a?: any;

  constructor() {}

  ngOnInit(): void {}

  seeQR(code: string): void {
    this.qrData = code;
  }

  downloadQR(event: any) {
    let img = event.srcElement;
    if (confirm('Deseas descargar la el código como imágen?')) {
      this.a = document.createElement('a');
      this.a.href = img.src;
      this.a.download = this.qrData;
      this.a.click();
    } else {
      this.closeQR();
    }
  }

  closeQR() {
    this.qrData = null;
  }
}
