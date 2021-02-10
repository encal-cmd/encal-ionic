import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGrupoPageRoutingModule } from './chat-grupo-routing.module';

import { ChatGrupoPage } from './chat-grupo.page';
import { AutosizeModule } from 'ngx-autosize';
import { DetalheImagemPage } from '../../modals/detalhe-imagem/detalhe-imagem.page';
import { DetalheImagemPageRoutingModule } from '../../modals/detalhe-imagem/detalhe-imagem-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGrupoPageRoutingModule,
    AutosizeModule,
    DetalheImagemPageRoutingModule
  ],
  declarations: [ChatGrupoPage],
  entryComponents: [DetalheImagemPage]
})
export class ChatGrupoPageModule {}
