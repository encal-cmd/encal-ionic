import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPrestadorPage } from './form-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: FormPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPrestadorPageRoutingModule {}
