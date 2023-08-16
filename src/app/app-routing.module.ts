import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { LoadDataViewComponent } from './modules/pre-data/load-data-view/load-data-view.component';
import { RootComponent } from './modules/senders/components/root/root.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  // { path: 'print', component: PrintTemplateComponent },
  {
    path: 'print',
    loadChildren: () =>
      import('./modules/print/print.module').then((m) => m.PrintModule),
    canActivate: [AuthenticationGuard],
  },
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
        path: 'remitentes',
        loadChildren: () =>
          import('./modules/senders/senders.module').then(
            (m) => m.SendersModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'proyectos',
        loadChildren: () =>
          import('./modules/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'plantillas',
        loadChildren: () =>
          import('./modules/templates/templates.module').then(
            (m) => m.TemplatesModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/config/config.module').then((m) => m.ConfigModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
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
