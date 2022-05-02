import { ElementRef } from '@angular/core';

export interface PrintOrder {
  width: number;
  height: number;
  element: ElementRef;
  data: Object;
}
