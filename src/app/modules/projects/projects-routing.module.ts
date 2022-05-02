import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { ProjectComponent } from './project/project.component';
import { RootComponent } from './root/root.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RootComponent,
  },
  {
    path: ':projectId',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: 'configuraciones' },
      { path: 'configuraciones', component: SettingsComponent },
      {
        path: 'registro',
        loadChildren: () =>
          import('../../modules/registrants/registrants.module').then(
            (m) => m.RegistrantsModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'asistencia',
        loadChildren: () =>
          import('../../modules/asistance/asistance.module').then(
            (m) => m.AsistanceModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'salas',
        loadChildren: () =>
          import('../../modules/rooms/rooms.module').then((m) => m.RoomsModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'equipos',
        loadChildren: () =>
          import('../../modules/systems/systems.module').then(
            (m) => m.SystemsModule
          ),
        canActivate: [AuthenticationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
