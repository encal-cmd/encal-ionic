import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoUsuariosPage } from './grupo-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoUsuariosPage
  },
  {
    path: 'new',
    loadChildren: () => import('./grupo-usuarios-new/grupo-usuarios-new.module').then( m => m.GrupoUsuariosNewPageModule)
  },
  {
    path: 'edit/:usuarioId',
    loadChildren: () => import('./grupo-usuarios-edit/grupo-usuarios-edit.module').then( m => m.GrupoUsuariosEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoUsuariosPageRoutingModule {}
