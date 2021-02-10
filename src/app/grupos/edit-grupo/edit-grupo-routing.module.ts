import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGrupoPage } from './edit-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: EditGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGrupoPageRoutingModule {}
