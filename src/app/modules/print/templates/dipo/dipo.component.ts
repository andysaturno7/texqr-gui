import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../print.service';

@Component({
  selector: 'tmp-dipo',
  templateUrl: './dipo.component.html',
  styleUrls: ['./dipo.component.css']
})
export class DipoComponent implements OnInit, AfterViewInit {

  data;
  styleId = '';
  @ViewChild('template') template: ElementRef;

  constructor(private _route: ActivatedRoute, private _print: PrintService) {
    this.data = this._print.lastData;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._print.readyToPrint();
    }, 500);
  }

}
