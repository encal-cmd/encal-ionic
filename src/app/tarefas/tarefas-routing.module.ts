import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefasPage } from './tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: TarefasPage
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasPageRoutingModule {}
