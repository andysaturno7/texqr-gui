import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootRegistrantsComponent } from './root-registrants/root-registrants.component';

const routes: Routes = [
  {
    path: '',
    component: RootRegistrantsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrantsRoutingModule {}
