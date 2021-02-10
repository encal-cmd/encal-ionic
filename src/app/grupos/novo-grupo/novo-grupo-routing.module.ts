import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoGrupoPage } from './novo-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: NovoGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoGrupoPageRoutingModule {}
