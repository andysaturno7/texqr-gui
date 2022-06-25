import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletComponent } from './outlet/outlet.component';
import { DipoComponent } from './templates/dipo/dipo.component';
import { TotemComponent } from './templates/totem/totem.component';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      { path: 'sticker', component: TotemComponent },
      { path: 'dipo', component: DipoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
