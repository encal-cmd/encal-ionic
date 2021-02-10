import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PermissoesUsuarioPage } from './permissoes-usuario.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PermissoesUsuarioPage
  }
];

@NgModule({
  imports: [IonicModule, RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule],
  exports: [RouterModule, PermissoesUsuarioPage],
  declarations: [PermissoesUsuarioPage]
})

export class PermissoesUsuarioPageRoutingModule {}
