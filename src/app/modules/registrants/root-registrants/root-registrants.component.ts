import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PageInfo, PaginatedData } from 'src/app/interfaces/paginated-data';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PrintService } from '../../print/print.service';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'root-registrants',
  templateUrl: './root-registrants.component.html',
  styleUrls: ['./root-registrants.component.css'],
})
export class RootRegistrantsComponent implements OnInit, OnDestroy {
  dataRegistrants: PaginatedData<Registrant>;
  registrantsSubscription: Subscription;
  dataRegistrantsFilter: string;

  dynamics: Dynamic[];
  dynamicsSubscription: Subscription;

  dataPrint: Registrant;

  qrdata: string;

  modalRef?: BsModalRef;

  constructor(
    private _regis: RegistrantsService,
    private _modalService: BsModalService,
    private _print: PrintService
  ) {
    this.dynamicsSubscription = this.subscribeDynamics();
    this.registrantsSubscription = this.getRegistrants({
      offset: 0,
      limit: 10,
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.registrantsSubscription.unsubscribe();
    this.dynamicsSubscription.unsubscribe();
  }

  getRegistrants(pageInfo: PageInfo) {
    return this._regis
      .getRegistrants(
        pageInfo.offset,
        pageInfo.limit,
        this.dataRegistrantsFilter
      )
      .subscribe(
        (res) => {
          res.offset = res.offset / res.limit;
          res.data.forEach((registrant) => {
            registrant.dynamics = JSON.parse(registrant.dynamics);
          });
          this.dataRegistrants = res;
          this._regis.setRegistrants(res);
        },
        (error) => {
          console.log({ error });
        }
      );
  }

  addToTable(reg: Registrant) {
    this.dataRegistrants.data.unshift(reg);
    this.dataRegistrants.data.pop();
    this.dataRegistrants = this.dataRegistrants;
  }

  subscribeDynamics(): Subscription {
    this._regis.getDynamics();
    return this._regis.dynamics.subscribe((dynamics) => {
      this.dynamics = dynamics;
    }, console.log);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onSelect({ selected }) {
    console.log({ selected });
  }

  handleQRTouched(code) {
    this.qrdata = code;
  }

  printStickerEvent(dataSticker: Registrant) {
    this._print.printSticker(dataSticker);
  }
}
