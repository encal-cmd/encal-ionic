import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalheImagemPageRoutingModule } from './detalhe-imagem-routing.module';
import { DetalheImagemPage } from './detalhe-imagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheImagemPageRoutingModule
  ],
  declarations: [],
  entryComponents: [DetalheImagemPage]
})
export class DetalheImagemPageModule {}
