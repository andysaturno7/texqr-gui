import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoomsComponent } from './root-rooms/root-rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { TableRoomsComponent } from './table-rooms/table-rooms.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [RootRoomsComponent, AddRoomComponent, TableRoomsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BsDropdownModule.forRoot(),
    SharedModule,
    ModalModule.forRoot()
  ],
})
export class RoomsModule {}
