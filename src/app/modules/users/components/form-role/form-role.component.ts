import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'user-form-role',
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.css'],
})
export class FormRoleComponent implements OnInit {
  environment: 'create' | 'update';
  role: any;
  existingPermissions: string[] = [];
  roleForm = this.fb.group({
    name: ['', Validators.required],
    permissions: new FormArray([]),
  });

  get permissionsFormArray() {
    return this.roleForm.controls.permissions as FormArray;
  }

  constructor(
    private _user: UsersService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.environment = this._route.snapshot.paramMap.get('id')
      ? 'update'
      : 'create';
  }

  async ngOnInit() {
    if (this.environment === 'update') {
      this.role = await this.getRole(this._route.snapshot.paramMap.get('id'));
      this.role.permissions = JSON.parse(this.role.permissions);
    }

    if (this.role)
      this.roleForm.setValue({ name: this.role.name, permissions: [] });
    this.existingPermissions = await this.getPermissions();
    this.existingPermissions.forEach((permission) => {
      this.permissionsFormArray.push(
        new FormControl(
          this.role ? this.role.permissions.includes(permission) : false
        )
      );
    });
  }

  getRole(id: string) {
    return this._user.getRole(id).toPromise();
  }

  getPermissions(): Promise<string[]> {
    return this._user.getPermissions().toPromise();
  }

  submit() {
    let valueForm = this.roleForm.value;
    valueForm.permissions = this.existingPermissions.filter(
      (value, index) => valueForm.permissions[index]
    );
    this[`${this.environment}Role`](valueForm).subscribe((res) => {
      alert('Listo');
    }, console.log);
  }

  createRole(role) {
    return this._user.createRole(role);
  }

  updateRole(role) {
    return this._user.updateRole({ ...role, id: this.role.id });
  }
}
