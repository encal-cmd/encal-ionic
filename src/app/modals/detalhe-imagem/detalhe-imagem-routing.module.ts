import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DetalheImagemPage } from './detalhe-imagem.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheImagemPage
  }
];

@NgModule({
  imports: [IonicModule, RouterModule.forChild(routes)],
  exports: [RouterModule, DetalheImagemPage],
  declarations: [DetalheImagemPage]
})
export class DetalheImagemPageRoutingModule {}
