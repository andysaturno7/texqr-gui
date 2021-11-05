import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './pipes/search.pipe';
import { OptionsTableComponent } from './agRenderer/options-table/options-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { InputCellComponent } from './agRenderer/input-cell/input-cell.component';
import { QrRendererComponent } from './agRenderer/qr-renderer/qr-renderer.component';
import { RoomsOptionsComponent } from './agRenderer/rooms-options/rooms-options.component';

@NgModule({
  declarations: [SearchPipe, QrRendererComponent, RoomsOptionsComponent],
  imports: [CommonModule, AgGridModule],
  exports: [SearchPipe],
})
export class SharedModule {}
