import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { HttpClientModule } from '@angular/common/http';
import { RegistrantsModule } from './modules/registrants/registrants.module';
import { PreDataModule } from './modules/pre-data/pre-data.module';

import { SharedModule } from './modules/shared/shared.module';

import { ListComponent } from './components/list/list.component';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { SideClientComponent } from './components/side-client/side-client.component';
import { MainClientComponent } from './components/main-client/main-client.component';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LibraryConfig } from './modules/authentication/models/config';

declare const __dirname: any;
let uri = environment.uri;
const socketConfig: SocketIoConfig = { url: uri, options: {} };
const authConfig: LibraryConfig = {
  authEndpoint: environment.uri + '/users/authenticate',
  initialPage: 'admin/client',
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ClientLayoutComponent,
    SideClientComponent,
    MainClientComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PreDataModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    SocketIoModule.forRoot(socketConfig),
    AuthenticationModule.forRoot(authConfig),
  ],
  providers: [
    {
      provide: 'API_URL',
      useValue: 'http://127.0.0.1:5050',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
