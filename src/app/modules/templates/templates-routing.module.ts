import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailTemplatesComponent } from './components/mail-templates/mail-templates.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';

const routes: Routes = [
  { path: '', component: MailTemplatesComponent },
  { path: 'nuevo', component: CreateTemplateComponent },
  { path: 'edit/:id', component: CreateTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
