import { Component, OnInit, TemplateRef } from '@angular/core';
import { RegistrantsService } from 'src/app/services/registrants.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Stored } from 'src/app/models/utils.types';
import { iUser } from 'src/app/modules/users/users.service';

@Component({
  selector: 'client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
})
export class ClientLayoutComponent implements OnInit {
  activeMenu: boolean = false;
  modalRef?: BsModalRef;
  user: Stored<iUser> = JSON.parse(localStorage.getItem('musicUser'));
  constructor(
    private _regis: RegistrantsService,
    private _modal: BsModalService
  ) {}

  ngOnInit(): void {}

  log() {
    console.log(this.activeMenu);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modal.show(template);
  }
}
