import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { RootComponent } from './root/root.component';
import { ItemProjectComponent } from './item-project/item-project.component';
import { ProjectComponent } from './project/project.component';
import { SettingsComponent } from './settings/settings.component';
import { AddDynamicComponent } from './dynamics/add-dynamic/add-dynamic.component';
import { TableDynamicComponent } from './dynamics/table-dynamic/table-dynamic.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ImportLogoComponent } from './marca/import-logo/import-logo.component';
import { MarcaRootComponent } from './marca/marca-root/marca-root.component';
import { ImportCoverComponent } from './marca/import-cover/import-cover.component';
import { MailSettingsComponent } from './components/mail-settings/mail-settings.component';
import { SendersModule } from '../senders/senders.module';
import { SelectTemplatesComponent } from './components/select-templates/select-templates.component';
import { MailPersonalizationsComponent } from './components/mail-personalizations/mail-personalizations.component';

@NgModule({
  declarations: [
    RootComponent,
    ItemProjectComponent,
    ProjectComponent,
    SettingsComponent,
    AddDynamicComponent,
    TableDynamicComponent,
    CreateFormComponent,
    ImportLogoComponent,
    MarcaRootComponent,
    ImportCoverComponent,
    MailSettingsComponent,
    SelectTemplatesComponent,
    MailPersonalizationsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SendersModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    CollapseModule,
    TimepickerModule.forRoot(),
  ],
})
export class ProjectsModule {}
