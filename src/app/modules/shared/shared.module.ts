import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './pipes/search.pipe';
import { OptionsTableComponent } from './agRenderer/options-table/options-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { InputCellComponent } from './agRenderer/input-cell/input-cell.component';
import { QrRendererComponent } from './agRenderer/qr-renderer/qr-renderer.component';
import { RoomsOptionsComponent } from './agRenderer/rooms-options/rooms-options.component';
import { InputDynamicComponent } from './dynamics/input-dynamic/input-dynamic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchPipe,
    QrRendererComponent,
    RoomsOptionsComponent,
    InputDynamicComponent,
  ],
  imports: [CommonModule, AgGridModule, FormsModule, ReactiveFormsModule],
  exports: [SearchPipe, InputDynamicComponent],
})
export class SharedModule {}
