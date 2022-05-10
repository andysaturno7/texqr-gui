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

  constructor(private _router: Router, private _location: Location) {}

  printSticker(data: Registrant) {
    this.isPrinting = true;
    let sticker_url = environment.uri + '/print/templates/totem-sticker.html';
    localStorage.setItem('registrant', JSON.stringify(data));
    let a = document.createElement('a');
    a.href = sticker_url;
    a.click();
    // this._router.navigate(['print', 'sticker'], { queryParams: data });
  }

  readyToPrint() {
    window.print();
    this.isPrinting = false;
    this._location.back();
  }
}