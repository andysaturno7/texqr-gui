import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootRoomsComponent } from './root-rooms/root-rooms.component';
import { RoomsRoutingModule } from './asistance-routing.module';
import { FormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { TableRoomsComponent } from './table-rooms/table-rooms.component';

@NgModule({
  declarations: [RootRoomsComponent, AddRoomComponent, TableRoomsComponent],
  imports: [CommonModule, RoomsRoutingModule, FormsModule],
})
export class RoomsModule {}
