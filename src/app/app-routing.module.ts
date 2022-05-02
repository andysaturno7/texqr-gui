import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { LoadDataViewComponent } from './modules/pre-data/load-data-view/load-data-view.component';
import { PrintTemplateComponent } from './modules/shared/print-template/print-template.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'print', component: PrintTemplateComponent },
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
        path: 'settings',
        loadChildren: () =>
          import('./modules/config/config.module').then((m) => m.ConfigModule),
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
