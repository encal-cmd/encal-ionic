import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AprovacaoService } from '../aprovacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-edit-aprovacao',
  templateUrl: './edit-aprovacao.page.html',
  styleUrls: ['./edit-aprovacao.page.scss'],
})
export class EditAprovacaoPage implements OnInit, OnDestroy {
  isLoading = false;
  avaliadores: string[];
  aprovacao = {
    id: 1,
    empresa: '',
    centroCusto: '',
    solicitante: '',
    dataSolicitacao: '',
    dataEntrega: '',
    valor: 1,
    obsPagamento: '',
    avaliadores: '',
    user_criou_id: '',
    status: '',
    user_avaliou: '',
    titulo: '',
    prestadorNome: '',
    prestadorBanco: '',
    prestadorAgencia: '',
    prestadorConta: '',
    prestadorCpf: '',
    prestadorId: 1,
  };
  currentUser: Usuario;
  private currentUserSub: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private aprovacaoService: AprovacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private usuarioService: UsuariosService
    ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      this.aprovacaoService.getAprovacao(paramMap.get('id')).subscribe(aprovacao => {
        this.isLoading = false;
        this.aprovacao = aprovacao;
        this.avaliadores = aprovacao.avaliadores.split('||');
      });
    });
  }

  avaliar(aprovId: number, acao: string) {
    let msg = '';
    if (acao === 'NEGAR') {
      msg = 'Negando...';
    } else {
      msg = 'Aprovando...';
    }
    this.loadingCtrl.create({
      message: msg
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.aprovacaoService.avaliarAprovacao(aprovId, acao).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.router.navigate(['/aprovacao']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  apagar(aprovId: number) {
    this.loadingCtrl.create({
      message: 'Apagando...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.aprovacaoService.apagarAprovacao(aprovId).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.router.navigate(['/aprovacao']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

}
