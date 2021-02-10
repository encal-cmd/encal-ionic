import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovacaoPage } from './aprovacao.page';

const routes: Routes = [
  {
    path: '',
    component: AprovacaoPage
  },
  {
    path: 'new/:id',
    loadChildren: () => import('./nova-aprovacao/nova-aprovacao.module').then( m => m.NovaAprovacaoPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-aprovacao/edit-aprovacao.module').then( m => m.EditAprovacaoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovacaoPageRoutingModule {}
