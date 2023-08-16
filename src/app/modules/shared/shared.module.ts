import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './pipes/search.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { QrRendererComponent } from './agRenderer/qr-renderer/qr-renderer.component';
import { RoomsOptionsComponent } from './agRenderer/rooms-options/rooms-options.component';
import { InputDynamicComponent } from './dynamics/input-dynamic/input-dynamic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/group-by.pipe';

@NgModule({
  declarations: [
    SearchPipe,
    QrRendererComponent,
    RoomsOptionsComponent,
    InputDynamicComponent,
    GroupByPipe,
  ],
  imports: [CommonModule, AgGridModule, FormsModule, ReactiveFormsModule],
  exports: [SearchPipe, InputDynamicComponent, GroupByPipe],
})
export class SharedModule {}
