import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoUsuarioPageRoutingModule } from './novo-usuario-routing.module';

import { NovoUsuarioPage } from './novo-usuario.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    NovoUsuarioPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [NovoUsuarioPage],
  entryComponents: []
})
export class NovoUsuarioPageModule {}
