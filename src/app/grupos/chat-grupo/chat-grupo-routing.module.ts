import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGrupoPage } from './chat-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGrupoPageRoutingModule {}
