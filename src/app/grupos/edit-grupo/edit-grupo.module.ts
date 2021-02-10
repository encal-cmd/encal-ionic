import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGrupoPageRoutingModule } from './edit-grupo-routing.module';

import { EditGrupoPage } from './edit-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGrupoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditGrupoPage]
})
export class EditGrupoPageModule {}
