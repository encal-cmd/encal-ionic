import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtapaProjetoPageRoutingModule } from './etapa-projeto-routing.module';

import { EtapaProjetoPage } from './etapa-projeto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    EtapaProjetoPageRoutingModule
  ],
  declarations: [EtapaProjetoPage]
})
export class EtapaProjetoPageModule {}
