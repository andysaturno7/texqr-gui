import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UsersService, iUser } from '../../users.service';
import { ActivatedRoute } from '@angular/router';
import { Stored } from 'src/app/models/utils.types';

@Component({
  selector: 'texqr-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    permissions: new FormArray([]),
  });
  get permissionsFormArray() {
    return this.userForm.controls.permissions as FormArray;
  }

  user?: Stored<iUser> | iUser;
  paramId: string | null = null;

  environment: 'edit' | 'create';
  existingRoles?: any[];
  existingPermissions?: string[];

  constructor(
    private fb: FormBuilder,
    private _user: UsersService,
    private _route: ActivatedRoute
  ) {
    this.paramId = this._route.snapshot.paramMap.get('id');
    this.environment = this.paramId !== null ? 'edit' : 'create';
  }

  async ngOnInit() {
    if (this.paramId) {
      let user = await this.getUser(this.paramId);
      user.permissions = JSON.parse(user.permissions);
      this.user = user;
    }

    if (this.user)
      this.userForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
        permissions: [],
      });

    // Set Roles
    let resRoles = await this.getExistingRoles();
    this.existingRoles = resRoles.data;

    // Set Permissions
    this.existingPermissions = await this.getPermissions();
    this.existingPermissions.forEach((permission) => {
      this.permissionsFormArray.push(
        new FormControl(
          this.user ? this.user.permissions.includes(permission) : false
        )
      );
    });
  }

  getUser(id: string) {
    return this._user.getUser(id).toPromise();
  }

  getExistingRoles() {
    return this._user.getRoles().toPromise();
  }

  getPermissions(): Promise<string[]> {
    return this._user.getPermissions().toPromise();
  }

  submit() {
    let valueForm = this.userForm.value;
    valueForm.permissions = this.existingPermissions.filter(
      (value, index) => valueForm.permissions[index]
    );
    this[this.environment + 'User'](valueForm);
  }

  createUser(user) {
    this._user.createUser(user).subscribe((res) => {
      alert('usuario creado....');
    }, console.log);
  }

  editUser(user) {
    let userValue = { ...user, id: this.user.id };
    this._user.updateUser(userValue).subscribe((res) => {
      alert('usuario editado...');
    }, console.log);
  }
}
