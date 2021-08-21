import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRegistrantComponent } from './add-registrant/add-registrant.component';
import { RootRegistrantsComponent } from './root-registrants/root-registrants.component';

const routes: Routes = [
  { path: 'registro', component: RootRegistrantsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrantsRoutingModule {}
