import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.css'],
})
export class TotemComponent implements AfterViewInit {
  data;

  constructor(private _route: ActivatedRoute, private _print: PrintService) {
    _route.queryParams.forEach((val) => {
      this.data = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._print.readyToPrint();
    }, 500);
  }
}
