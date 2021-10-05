import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LogoutComponent } from './components/logout/logout.component';
import { LibraryConfig } from './models/config';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent, LogoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [LogoutComponent],
})
export class AuthenticationModule {
  static forRoot(
    config: LibraryConfig
  ): ModuleWithProviders<AuthenticationModule> {
    return {
      ngModule: AuthenticationModule,
      providers: [{ provide: 'config', useValue: config }],
    };
  }
}
