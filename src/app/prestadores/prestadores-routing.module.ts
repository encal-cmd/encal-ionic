import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestadoresPage } from './prestadores.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadoresPage
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./form-prestador/form-prestador.module').then( m => m.FormPrestadorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadoresPageRoutingModule {}
