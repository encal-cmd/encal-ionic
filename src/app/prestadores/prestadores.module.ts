import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestadoresPageRoutingModule } from './prestadores-routing.module';

import { PrestadoresPage } from './prestadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestadoresPageRoutingModule
  ],
  declarations: [PrestadoresPage]
})
export class PrestadoresPageModule {}
