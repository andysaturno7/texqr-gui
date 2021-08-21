import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './pipes/search.pipe';
import { OptionsTableComponent } from './agRenderer/options-table/options-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { InputCellComponent } from './agRenderer/input-cell/input-cell.component';
import { QrRendererComponent } from './agRenderer/qr-renderer/qr-renderer.component';

@NgModule({
  declarations: [SearchPipe, QrRendererComponent],
  imports: [CommonModule, AgGridModule],
  exports: [SearchPipe],
})
export class SharedModule {}
