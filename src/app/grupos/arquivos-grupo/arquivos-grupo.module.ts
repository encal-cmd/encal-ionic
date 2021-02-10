import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArquivosGrupoPageRoutingModule } from './arquivos-grupo-routing.module';

import { ArquivosGrupoPage } from './arquivos-grupo.page';
import { ImagePickerComponent } from '../../pickers/image-picker/image-picker.component';

import { DetalheImagemPage } from '../../modals/detalhe-imagem/detalhe-imagem.page';
import { DetalheImagemPageRoutingModule } from '../../modals/detalhe-imagem/detalhe-imagem-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArquivosGrupoPageRoutingModule,
    DetalheImagemPageRoutingModule
  ],
  declarations: [ArquivosGrupoPage, ImagePickerComponent],
  entryComponents: [ImagePickerComponent, DetalheImagemPage]
})
export class ArquivosGrupoPageModule {}
