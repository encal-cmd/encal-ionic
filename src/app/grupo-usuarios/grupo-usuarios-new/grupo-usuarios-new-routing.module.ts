import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoUsuariosNewPage } from './grupo-usuarios-new.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoUsuariosNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoUsuariosNewPageRoutingModule {}
