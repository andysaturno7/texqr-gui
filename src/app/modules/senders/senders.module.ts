import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendersRoutingModule } from './senders-routing.module';
import { RootComponent } from './components/root/root.component';
import { CreateSenderComponent } from './components/create-sender/create-sender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSenderComponent } from './components/list-sender/list-sender.component';
import { SelectSendersComponent } from './components/select-senders/select-senders.component';

@NgModule({
  declarations: [
    RootComponent,
    CreateSenderComponent,
    ListSenderComponent,
    SelectSendersComponent,
  ],
  imports: [
    CommonModule,
    SendersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SelectSendersComponent],
})
export class SendersModule {}
