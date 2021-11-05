import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoomsComponent } from './root-rooms/root-rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { TableRoomsComponent } from './table-rooms/table-rooms.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [RootRoomsComponent, AddRoomComponent, TableRoomsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(),
  ],
})
export class RoomsModule {}
