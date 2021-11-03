import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { RegistrantComponent } from './registrant/registrant.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'registro' },
      { path: 'registro', component: RegistrantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
