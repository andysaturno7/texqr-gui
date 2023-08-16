import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LibraryConfig } from './models/config';
import { User } from './models/user.model';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private _user: UsersService,
    @Inject('config') private config: LibraryConfig
  ) {}

  login(user: User) {
    var username = user.username;
    return this._user.login(user.username, user.password).pipe(
      map((user) => {
        localStorage.setItem('musicUser', JSON.stringify(user));
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('musicUser');
    this.router.navigate(['/login']);
  }

  getLoggedUser(): { token: string } {
    return JSON.parse(localStorage.getItem('musicUser'));
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('musicUser');
  }
}
