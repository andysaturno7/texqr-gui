import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootRoomsComponent } from './root-rooms/root-rooms.component';

const routes: Routes = [{ path: '', component: RootRoomsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
