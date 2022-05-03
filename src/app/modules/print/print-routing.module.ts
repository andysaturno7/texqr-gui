import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { TotemComponent } from './templates/totem/totem.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [{ path: 'sticker', component: TotemComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
