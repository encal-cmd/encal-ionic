import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaAprovacaoPage } from './nova-aprovacao.page';

const routes: Routes = [
  {
    path: '',
    component: NovaAprovacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaAprovacaoPageRoutingModule {}
