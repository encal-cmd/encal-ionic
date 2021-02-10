import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoGrupoPageRoutingModule } from './novo-grupo-routing.module';

import { NovoGrupoPage } from './novo-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    NovoGrupoPageRoutingModule
  ],
  declarations: [NovoGrupoPage]
})
export class NovoGrupoPageModule {}
