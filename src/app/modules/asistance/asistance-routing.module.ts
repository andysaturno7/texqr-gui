import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootAsistanceComponent } from './root-asistance/root-asistance.component';

const routes: Routes = [{ path: '', component: RootAsistanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistanceRoutingModule {}
