import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { TotemComponent } from './templates/totem/totem.component';
import { OutletComponent } from './outlet/outlet.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DipoComponent } from './templates/dipo/dipo.component';
import { DynamicHostDirective } from './directives/dynamic-host.directive';
import { DynamicComponent } from './components/dynamic/dynamic.component';

@NgModule({
  declarations: [TotemComponent, OutletComponent, DipoComponent, DynamicHostDirective, DynamicComponent],
  imports: [CommonModule, PrintRoutingModule, QRCodeModule],
})
export class PrintModule {}
