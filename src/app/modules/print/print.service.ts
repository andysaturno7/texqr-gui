import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Registrant } from 'src/app/services/registrants.service';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  isPrinting: boolean = false;

  constructor(private _router: Router, private _location: Location) {}

  printSticker(data: Registrant) {
    this.isPrinting = true;
    this._router.navigate(['print', 'sticker'], { queryParams: data });
  }

  readyToPrint() {
    window.print();
    this.isPrinting = false;
    this._location.back();
  }
}
