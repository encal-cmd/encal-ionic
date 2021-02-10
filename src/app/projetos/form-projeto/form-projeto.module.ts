import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProjetoPageRoutingModule } from './form-projeto-routing.module';

import { FormProjetoPage } from './form-projeto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    FormProjetoPageRoutingModule
  ],
  declarations: [FormProjetoPage]
})
export class FormProjetoPageModule {}
