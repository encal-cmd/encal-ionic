import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowGrupoPage } from './show-grupo.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ShowGrupoPage,
    children: [
      { path: 'chat', children: [
        {
          path: '',
          loadChildren: () => import('../chat-grupo/chat-grupo.module').then( m => m.ChatGrupoPageModule)
        }
      ]},
      { path: 'arquivos', children: [
        {
          path: '',
          loadChildren: () => import('../arquivos-grupo/arquivos-grupo.module').then( m => m.ArquivosGrupoPageModule)
        }
      ]}
    ]
  },
  {
      path: '',
      redirectTo: '/grupos',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowGrupoPageRoutingModule {}
