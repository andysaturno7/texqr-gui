import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PrintService } from '../../print.service';

declare const QRCode;

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.css'],
})
export class TotemComponent implements AfterViewInit, OnDestroy {
  registrant;
  render: string;

  @ViewChild('template') template: ElementRef;

  constructor(private _print: PrintService) {
    this.registrant = this._print.lastData.data;
    this.render = this._print.lastData.render;
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    let div = document.createElement('div');
    div.innerHTML = this.render;
    let items = div.getElementsByTagName('qr');
    this.template.nativeElement.innerHTML = div.innerHTML;
    if (items.length > 0) {
      let item = items[0];
      let code = item.getAttribute('code');
      if (code) {
        let options = {};
        let width = item.getAttribute('width');
        let height = item.getAttribute('height');
        if (width) options['width'] = Number(width);
        if (height) options['height'] = Number(height);
        this.generateQRCode(code, options);
      }
    }
    setTimeout(() => {
      this._print.readyToPrint();
    }, 500);
  }

  generateQRCode(code: string, options = {}) {
    let dOptions = {
      text: code || 'default',
      width: 85,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    };
    dOptions = { ...dOptions, ...options };
    new QRCode('qr', dOptions);
  }
}
