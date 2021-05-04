import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosPageRoutingModule } from './grupo-usuarios-routing.module';

import { GrupoUsuariosPage } from './grupo-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoUsuariosPageRoutingModule
  ],
  declarations: [GrupoUsuariosPage]
})
export class GrupoUsuariosPageModule {}
