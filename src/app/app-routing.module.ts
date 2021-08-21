import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadDataViewComponent } from './modules/pre-data/load-data-view/load-data-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'registro' },
  { path: 'client', component: LoadDataViewComponent },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modules/registrants/registrants.module').then(
        (m) => m.RegistrantsModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'asistencia',
    loadChildren: () =>
      import('./modules/asistance/asistance.module').then(
        (m) => m.AsistanceModule
      ),
  },
  {
    path: 'salas',
    loadChildren: () =>
      import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'equipos',
    loadChildren: () =>
      import('./modules/systems/systems.module').then((m) => m.SystemsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
