import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PermissoesUsuarioPageRoutingModule } from './permissoes-usuario-routing.module';
import { PermissoesUsuarioPage } from './permissoes-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    PermissoesUsuarioPageRoutingModule
  ],
  declarations: [],
  entryComponents: [PermissoesUsuarioPage]
})
export class PermissoesUsuarioPageModule {}
