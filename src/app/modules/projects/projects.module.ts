import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { RootComponent } from './root/root.component';
import { ItemProjectComponent } from './item-project/item-project.component';
import { ProjectComponent } from './project/project.component';
import { SettingsComponent } from './settings/settings.component';
import { AddDynamicComponent } from './dynamics/add-dynamic/add-dynamic.component';
import { TableDynamicComponent } from './dynamics/table-dynamic/table-dynamic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RootComponent,
    ItemProjectComponent,
    ProjectComponent,
    SettingsComponent,
    AddDynamicComponent,
    TableDynamicComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
