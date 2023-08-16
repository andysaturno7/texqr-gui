import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from 'src/app/interfaces/paginated-data';
import { Stored } from 'src/app/models/utils.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private uri = environment.uri;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<iUser>(`${this.uri}/users/authenticate`, {
      username,
      password,
    });
  }

  get user(): iUser {
    return JSON.parse(localStorage.getItem('musicUser'));
  }

  set user(user: iUser) {
    localStorage.setItem('musicUser', JSON.stringify(user));
  }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUser(id: string) {
    return this.http.get<Stored<iUser>>(`${this.uri}/users/${id}`);
  }

  createUser(user: iUser) {
    return this.http.post(`${this.uri}/users`, user);
  }

  updateUser(user: Stored<iUser>) {
    return this.http.post(`${this.uri}/users/update`, user);
  }

  removeUser(userId: string) {
    return this.http.delete(`${this.uri}/users/${userId}`);
  }

  getRoles() {
    return this.http.get<PaginatedData<any>>(`${this.uri}/users/roles`);
  }

  getRole(id: string) {
    return this.http.get(`${this.uri}/users/roles/${id}`);
  }

  createRole(role) {
    return this.http.post(`${this.uri}/users/roles`, role);
  }

  deleteRole(id: string) {
    return this.http.delete(`${this.uri}/users/roles/${id}`);
  }

  updateRole(role) {
    return this.http.post(`${this.uri}/users/roles/update`, role);
  }

  getPermissions() {
    return this.http.get<string[]>(`${this.uri}/users/permissions`);
  }
}

export interface iUser {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  role: keyof typeof Roles;
  // permissions: Array<keyof typeof Permissions>;
  permissions: string;
}

enum Roles {
  admin,
  reader,
  editor,
}

enum Permissions {
  read,
  edit,
  delete,
  update,
}
