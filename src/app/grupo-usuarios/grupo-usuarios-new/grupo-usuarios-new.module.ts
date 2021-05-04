import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosNewPageRoutingModule } from './grupo-usuarios-new-routing.module';

import { GrupoUsuariosNewPage } from './grupo-usuarios-new.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    GrupoUsuariosNewPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [GrupoUsuariosNewPage]
})
export class GrupoUsuariosNewPageModule {}
