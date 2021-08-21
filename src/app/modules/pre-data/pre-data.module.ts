import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { PreDataRoutingModule } from './pre-data-routing.module';
import { LoadDataViewComponent } from './load-data-view/load-data-view.component';
import { DataViewComponent } from './data-view/data-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OptionsTableComponent } from '../shared/agRenderer/options-table/options-table.component';
import { InputCellComponent } from '../shared/agRenderer/input-cell/input-cell.component';

@NgModule({
  declarations: [LoadDataViewComponent, DataViewComponent],
  imports: [
    CommonModule,
    PreDataRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AgGridModule.withComponents([OptionsTableComponent, InputCellComponent]),
  ],
  exports: [LoadDataViewComponent],
})
export class PreDataModule {}
