import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { MainViewComponent } from './main-view/main-view.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { OptionsTableComponent } from '../shared/agRenderer/options-table/options-table.component';

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    AgGridModule.withComponents(OptionsTableComponent),
    SharedModule,
  ],
})
export class ConfigModule {}
