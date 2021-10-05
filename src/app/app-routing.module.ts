import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { LoadDataViewComponent } from './modules/pre-data/load-data-view/load-data-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: ClientLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'client',
        component: LoadDataViewComponent,
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('./modules/registrants/registrants.module').then(
            (m) => m.RegistrantsModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/config/config.module').then((m) => m.ConfigModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'asistencia',
        loadChildren: () =>
          import('./modules/asistance/asistance.module').then(
            (m) => m.AsistanceModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'salas',
        loadChildren: () =>
          import('./modules/rooms/rooms.module').then((m) => m.RoomsModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'equipos',
        loadChildren: () =>
          import('./modules/systems/systems.module').then(
            (m) => m.SystemsModule
          ),
        canActivate: [AuthenticationGuard],
      },
    ],
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
