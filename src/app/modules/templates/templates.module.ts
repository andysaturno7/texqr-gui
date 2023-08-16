import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { MailTemplatesComponent } from './components/mail-templates/mail-templates.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MailTemplatesComponent, CreateTemplateComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TemplatesModule {}
