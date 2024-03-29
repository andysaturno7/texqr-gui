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
import { MailService } from 'src/app/services/mail.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TemplatesService } from '../../templates/templates.service';

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

  selected: Registrant[] | undefined;

  constructor(
    private _regis: RegistrantsService,
    private _modalService: BsModalService,
    private _print: PrintService,
    private _mail: MailService,
    private _project: ProjectsService,
    private _template: TemplatesService
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

  importDB(ev) {
    let file = ev.target.files[0];
    console.log({ file });

    if (file.size > 100000) return alert('Muy pesado');
    this._regis.import(file);
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

  sendBulkMail(registrants: Registrant[]) {
    this._mail.sendRegistrantBulkMail(registrants);
  }

  bulkDelete(registrants: Registrant[]) {
    this._regis.deleteBulk(registrants).subscribe(
      (res) => {
        console.log({ res });
      },
      (error) => {
        console.log({ error });
      }
    );
  }

  onSelect({ selected }) {
    this.selected = selected;
    console.log(this.selected);
  }

  handleQRTouched(code) {
    this.qrdata = code;
  }

  printStickerEvent(dataSticker: Registrant) {
    let project = this._project.project;
    let templateId = project.StickerTemplateId;
    this._template.getById(templateId).subscribe((res) => {
      let template = res.template;
      this._print.printSticker(template, { registrant: dataSticker, project });
    }, console.log);
  }
}
