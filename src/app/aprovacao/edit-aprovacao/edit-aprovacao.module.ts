import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAprovacaoPageRoutingModule } from './edit-aprovacao-routing.module';

import { EditAprovacaoPage } from './edit-aprovacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAprovacaoPageRoutingModule
  ],
  declarations: [EditAprovacaoPage]
})
export class EditAprovacaoPageModule {}
