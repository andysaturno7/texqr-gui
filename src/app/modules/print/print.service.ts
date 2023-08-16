import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare const ejs;

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  isPrinting: boolean = false;

  public lastData: any;

  constructor(private _router: Router, private _location: Location) {}

  printSticker(template: string, data: any) {
    if (this.isPrinting) return;
    this.isPrinting = true;
    let render = ejs.render(template, data);
    this.lastData = { render, data };
    this._router.navigate(['print', 'sticker']);
  }

  readyToPrint() {
    window.print();
    this._location.back();
    this.isPrinting = false;
  }
}
