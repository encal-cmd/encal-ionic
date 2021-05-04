import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoUsuariosEditPage } from './grupo-usuarios-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoUsuariosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoUsuariosEditPageRoutingModule {}
