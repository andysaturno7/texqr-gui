import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PageInfo, PaginatedData } from 'src/app/interfaces/paginated-data';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PrintService } from '../../print/print.service';

@Component({
  selector: 'root-registrants',
  templateUrl: './root-registrants.component.html',
  styleUrls: ['./root-registrants.component.css'],
})
export class RootRegistrantsComponent implements OnInit {
  dataRegistrants: PaginatedData<Registrant>;
  dataRegistrantsFilter: string;

  dataPrint: Registrant;

  qrdata: string;

  modalRef?: BsModalRef;

  constructor(
    private _regis: RegistrantsService,
    private _modalService: BsModalService,
    private _print: PrintService
  ) {
    this.getRegistrants({ offset: 0, limit: 10 });
  }

  getRegistrants(pageInfo: PageInfo) {
    this._regis
      .getRegistrants(
        pageInfo.offset,
        pageInfo.limit,
        this.dataRegistrantsFilter
      )
      .subscribe(
        (res) => {
          res.offset = res.offset / res.limit;
          this.dataRegistrants = res;
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

  ngOnInit(): void {}
}
