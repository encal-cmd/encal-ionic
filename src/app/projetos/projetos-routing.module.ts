import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetosPage } from './projetos.page';

const routes: Routes = [
  {
    path: '',
    component: ProjetosPage
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./form-projeto/form-projeto.module').then( m => m.FormProjetoPageModule)
  },
  {
    path: 'etapa/:id',
    loadChildren: () => import('./etapa-projeto/etapa-projeto.module').then( m => m.EtapaProjetoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetosPageRoutingModule {}
