import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrantsRoutingModule } from './registrants-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RegistrantTableComponent } from './registrant-table/registrant-table.component';
import { AddRegistrantComponent } from './add-registrant/add-registrant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RootRegistrantsComponent } from './root-registrants/root-registrants.component';
import { AgGridModule } from 'ag-grid-angular';
import { OptionsTableComponent } from '../shared/agRenderer/options-table/options-table.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AddRegistrantFormComponent } from './add-registrant-form/add-registrant-form.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    RegistrantTableComponent,
    AddRegistrantComponent,
    DropdownComponent,
    RootRegistrantsComponent,
    AddRegistrantFormComponent,
  ],
  imports: [
    CommonModule,
    RegistrantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    AgGridModule.withComponents([OptionsTableComponent]),
    QRCodeModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
  exports: [
    RegistrantTableComponent,
    AddRegistrantComponent,
    DropdownComponent,
  ],
})
export class RegistrantsModule {}
