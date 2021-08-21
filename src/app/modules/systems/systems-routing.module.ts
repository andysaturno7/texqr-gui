import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootSystemsComponent } from './root-systems/root-systems.component';

const routes: Routes = [{ path: '', component: RootSystemsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemsRoutingModule {}
