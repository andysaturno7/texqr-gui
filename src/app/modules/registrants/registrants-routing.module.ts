import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRegistrantComponent } from './add-registrant/add-registrant.component';
import { RegistrantTableComponent } from './registrant-table/registrant-table.component';
import { RootRegistrantsComponent } from './root-registrants/root-registrants.component';

const routes: Routes = [
  {
    path: '',
    component: RootRegistrantsComponent,
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: RegistrantTableComponent },
      { path: 'new', component: AddRegistrantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrantsRoutingModule {}
