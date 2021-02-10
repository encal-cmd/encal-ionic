import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'introducao', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)},
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'introducao',
    loadChildren: () => import('./introducao/introducao.module').then( m => m.IntroducaoPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then( m => m.ContatoPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then( m => m.GruposPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'detalhe-imagem',
    loadChildren: () => import('./modals/detalhe-imagem/detalhe-imagem.module').then( m => m.DetalheImagemPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'permissoes-usuario',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modals/permissoes-usuario/permissoes-usuario.module').then( m => m.PermissoesUsuarioPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'aprovacao',
    loadChildren: () => import('./aprovacao/aprovacao.module').then( m => m.AprovacaoPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'modal-usuarios',
    loadChildren: () => import('./modal-usuarios/modal-usuarios.module').then( m => m.ModalUsuariosPageModule)
  },
  {
    path: 'prestadores',
    loadChildren: () => import('./prestadores/prestadores.module').then( m => m.PrestadoresPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefas.module').then( m => m.TarefasPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'projetos',
    loadChildren: () => import('./projetos/projetos.module').then( m => m.ProjetosPageModule), canLoad: [AuthGuard]
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule), canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
