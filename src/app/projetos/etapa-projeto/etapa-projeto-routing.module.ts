import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtapaProjetoPage } from './etapa-projeto.page';

const routes: Routes = [
  {
    path: '',
    component: EtapaProjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtapaProjetoPageRoutingModule {}
