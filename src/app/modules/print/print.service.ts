import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, UrlCreationOptions } from '@angular/router';
import { Registrant } from 'src/app/services/registrants.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  isPrinting: boolean = false;

  public lastData: any;

  constructor(private _router: Router, private _location: Location) {}

  printSticker(data: Registrant, template: string = 'sticker') {
    if(this.isPrinting) return;
    this.isPrinting = true;
    this.lastData = data;
    this._router.navigate(['print', template]);
  }

  readyToPrint() {
    window.print();
    this._location.back();
    this.isPrinting = false;
  }
}