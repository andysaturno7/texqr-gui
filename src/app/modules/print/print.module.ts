import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { TotemComponent } from './templates/totem/totem.component';
import { OutletComponent } from './outlet/outlet.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DipoComponent } from './templates/dipo/dipo.component';

@NgModule({
  declarations: [TotemComponent, OutletComponent, DipoComponent],
  imports: [CommonModule, PrintRoutingModule, QRCodeModule],
})
export class PrintModule {}
