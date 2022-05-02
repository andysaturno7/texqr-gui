import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { RootComponent } from './root/root.component';
import { ItemProjectComponent } from './item-project/item-project.component';
import { ProjectComponent } from './project/project.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [RootComponent, ItemProjectComponent, ProjectComponent, SettingsComponent],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
