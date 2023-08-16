import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { FormRoleComponent } from './components/form-role/form-role.component';
import { FormUserComponent } from './components/form-user/form-user.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'nuevo', component: FormUserComponent },
  { path: 'edit/:id', component: FormUserComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'roles/nuevo', component: FormRoleComponent },
  { path: 'roles/:id', component: FormRoleComponent },
  { path: 'permisos', component: PermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
