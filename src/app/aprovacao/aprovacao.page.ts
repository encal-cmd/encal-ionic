import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { AprovacaoService } from './aprovacao.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../usuarios/usuario.model';

@Component({
  selector: 'app-aprovacao',
  templateUrl: './aprovacao.page.html',
  styleUrls: ['./aprovacao.page.scss'],
})
export class AprovacaoPage implements OnInit {
  isLoading: boolean;
  private aprovacaoSub: Subscription;
  aprovacoes = [];
  aprovacoesShow = [];
  currentUser: Usuario;

  constructor(private usuarioService: UsuariosService, private aprovacaoService: AprovacaoService, private router: Router) { }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
        console.log(user);
        this.currentUser = user;
        // tslint:disable-next-line: max-line-length
      })
    ).subscribe();
    console.log('-------- AAAAAAAAA ----');
  }

  ionViewWillEnter() {
    this.aprovacaoService.getAprovacoes().subscribe(data => {
      this.aprovacoes = data;
      this.aprovacoesShow = data.filter(p => p.status === 'PENDENTE');
      console.log(data);
    });
  }


  segmentChanged(evt) {

    console.log(evt.detail.value);

    if (evt.detail.value === 'pendentes') {
      this.aprovacoesShow = this.aprovacoes.filter(p => p.status === 'PENDENTE');
    } else if (evt.detail.value === 'aprovados') {
      this.aprovacoesShow = this.aprovacoes.filter(p => p.status === 'APROVADO');
    } else {
      this.aprovacoesShow = this.aprovacoes.filter(p => p.status === 'NEGADO');
    }

  }
}
