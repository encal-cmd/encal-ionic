import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProjetoPage } from './form-projeto.page';

const routes: Routes = [
  {
    path: '',
    component: FormProjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProjetoPageRoutingModule {}
