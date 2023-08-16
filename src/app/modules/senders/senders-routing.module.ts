import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { CreateSenderComponent } from './components/create-sender/create-sender.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RootComponent, children: [] },
  { path: 'nuevo', component: CreateSenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendersRoutingModule {}
