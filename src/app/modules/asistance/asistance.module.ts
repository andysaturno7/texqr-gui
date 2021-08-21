import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistanceRoutingModule } from './asistance-routing.module';
import { RootAsistanceComponent } from './root-asistance/root-asistance.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AsistanceTableComponent } from './asistance-table/asistance-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { OptionsTableComponent } from '../shared/agRenderer/options-table/options-table.component';

@NgModule({
  declarations: [RootAsistanceComponent, AsistanceTableComponent],
  imports: [
    CommonModule,
    AsistanceRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    AgGridModule.withComponents([OptionsTableComponent]),
  ],
})
export class AsistanceModule {}
