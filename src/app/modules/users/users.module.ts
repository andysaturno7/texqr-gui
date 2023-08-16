import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SendersComponent } from './components/senders/senders.component';
import { RootComponent } from './components/root/root.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { TableComponent } from './components/table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormRoleComponent } from './components/form-role/form-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupInputRoleComponent } from './components/group-input-role/group-input-role.component';
import { FormUserComponent } from './components/form-user/form-user.component';

@NgModule({
  declarations: [
    SendersComponent,
    RootComponent,
    RolesComponent,
    PermissionsComponent,
    TableComponent,
    FormRoleComponent,
    GroupInputRoleComponent,
    FormUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BsDropdownModule,
  ],
  exports: [SendersComponent],
})
export class UsersModule {}
