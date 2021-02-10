import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAprovacaoPage } from './edit-aprovacao.page';

const routes: Routes = [
  {
    path: '',
    component: EditAprovacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAprovacaoPageRoutingModule {}
