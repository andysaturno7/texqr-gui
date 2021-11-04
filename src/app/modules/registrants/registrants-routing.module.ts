import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRegistrantComponent } from './add-registrant/add-registrant.component';
import { RegistrantTableComponent } from './registrant-table/registrant-table.component';
import { RootRegistrantsComponent } from './root-registrants/root-registrants.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: RootRegistrantsComponent,
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail', component: RegistrantTableComponent },
      { path: 'new', component: AddRegistrantComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrantsRoutingModule {}
