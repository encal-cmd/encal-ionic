import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPrestadorPageRoutingModule } from './form-prestador-routing.module';

import { FormPrestadorPage } from './form-prestador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    FormPrestadorPageRoutingModule
  ],
  declarations: [FormPrestadorPage]
})
export class FormPrestadorPageModule {}
