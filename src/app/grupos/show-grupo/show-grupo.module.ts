import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowGrupoPageRoutingModule } from './show-grupo-routing.module';

import { ShowGrupoPage } from './show-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowGrupoPageRoutingModule
  ],
  declarations: [ShowGrupoPage]
})
export class ShowGrupoPageModule {}
