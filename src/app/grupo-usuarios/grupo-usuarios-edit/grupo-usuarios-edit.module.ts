import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosEditPageRoutingModule } from './grupo-usuarios-edit-routing.module';

import { GrupoUsuariosEditPage } from './grupo-usuarios-edit.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GrupoUsuariosEditPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [GrupoUsuariosEditPage]
})
export class GrupoUsuariosEditPageModule {}
