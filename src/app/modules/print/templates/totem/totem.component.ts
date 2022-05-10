import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../print.service';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.component.html',
  styleUrls: ['./totem.component.css'],
})
export class TotemComponent implements AfterViewInit, OnDestroy {
  data;
  styleId = 'totem-sticker-style';
  @ViewChild('template') template: ElementRef;

  constructor(private _route: ActivatedRoute, private _print: PrintService) {
    this.data = this._print.lastData;
  }
  
  ngOnDestroy(): void {}
  
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      this._print.readyToPrint();
    }, 500);
  }
}
