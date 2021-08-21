import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { RootSystemsComponent } from './root-systems/root-systems.component';
import { SystemsTableComponent } from './systems-table/systems-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RootSystemsComponent, SystemsTableComponent],
  imports: [CommonModule, SystemsRoutingModule, FormsModule],
})
export class SystemsModule {}
