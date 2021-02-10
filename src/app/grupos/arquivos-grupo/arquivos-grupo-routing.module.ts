import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArquivosGrupoPage } from './arquivos-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: ArquivosGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArquivosGrupoPageRoutingModule {}
