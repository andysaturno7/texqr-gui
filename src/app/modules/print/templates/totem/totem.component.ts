import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../print.service';
import { DynamicComponent } from '../../components/dynamic/dynamic.component';
import { DynamicHostDirective } from '../../directives/dynamic-host.directive';

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
    this.template.nativeElement.innerHTML = this.render;
    setTimeout(() => {
      this._print.readyToPrint();
    }, 500);
  }
}
