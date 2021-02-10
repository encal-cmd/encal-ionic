import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovacaoPageRoutingModule } from './aprovacao-routing.module';

import { AprovacaoPage } from './aprovacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovacaoPageRoutingModule
  ],
  declarations: [AprovacaoPage]
})
export class AprovacaoPageModule {}
