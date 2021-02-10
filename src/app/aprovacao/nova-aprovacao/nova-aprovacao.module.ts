import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NovaAprovacaoPageRoutingModule } from './nova-aprovacao-routing.module';
import { NovaAprovacaoPage } from './nova-aprovacao.page';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    NovaAprovacaoPageRoutingModule,
    BrMaskerModule,
    IonicSelectableModule
  ],
  declarations: [NovaAprovacaoPage],
  entryComponents: []
})
export class NovaAprovacaoPageModule {}
