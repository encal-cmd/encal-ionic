import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposPage } from './grupos.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  },
  {
    path: 'new',
    loadChildren: () => import('./novo-grupo/novo-grupo.module').then( m => m.NovoGrupoPageModule)
  },
  {
    path: 'grupo/:grupoId',
    loadChildren: () => import('./grupo/grupo.module').then( m => m.GrupoPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./show-grupo/show-grupo.module').then( m => m.ShowGrupoPageModule)
  },
  {
    path: 'chat-grupo',
    loadChildren: () => import('./chat-grupo/chat-grupo.module').then( m => m.ChatGrupoPageModule)
  },
  {
    path: 'arquivos-grupo',
    loadChildren: () => import('./arquivos-grupo/arquivos-grupo.module').then( m => m.ArquivosGrupoPageModule)
  },
  {
    path: 'edit/:grupoId',
    loadChildren: () => import('./edit-grupo/edit-grupo.module').then( m => m.EditGrupoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposPageRoutingModule {}
