import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PrintOrder } from '../models/print-order';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private _QueuePrint: Subject<PrintOrder> = new Subject<PrintOrder>();
  public queuePrint: Observable<PrintOrder> = this._QueuePrint.asObservable();
  constructor() {}

  nextPrint(printOrder: PrintOrder) {
    this._QueuePrint.next(printOrder);
  }
  private JsonToCsv(json) {}
}

export class ServerSideDataSource {
  constructor() {}
  getRows(params) {
    console.log({ params: params.request });
    params.fail();
  }
}
