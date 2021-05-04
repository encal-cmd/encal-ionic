import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AprovacaoService } from '../aprovacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-aprovacao',
  templateUrl: './edit-aprovacao.page.html',
  styleUrls: ['./edit-aprovacao.page.scss'],
})
export class EditAprovacaoPage implements OnInit, OnDestroy {
  isLoading = false;
  avaliadores: string[];
  aprovacao: any;
  currentUser: Usuario;
  fileTransfer: FileTransferObject;
  private currentUserSub: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private aprovacaoService: AprovacaoService,
    private fileOpener: FileOpener,
    private file: File,
    private transfer: FileTransfer,
    private router: Router,
    private route: ActivatedRoute,
    private androidPermissions: AndroidPermissions,
    private alertCtrl: AlertController,
    private usuarioService: UsuariosService,
    public authService: AuthService
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
        console.log(aprovacao)
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

  downloadAnexo(url, extensao, msgId) {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(r => {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(writeperm => {
        this.downfunc(url, extensao, msgId);
      });
    });
  }

  downfunc(url, extensao, anexoAprovId) {
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log(anexoAprovId);
    const anexo = this.aprovacao.anexos.find(p => p[0] === anexoAprovId); // PEGAR ANEXO
    console.log(anexo);
    anexo[6] = true;
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
      const perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      anexo.porcentagem = perc / 100;
    });
    const rand = Math.floor(Math.random() * 9999999);
    this.fileTransfer.download(url, this.file.externalRootDirectory + 'anexo' + rand + '.' + extensao).then(data => {
      anexo[4] = data.nativeURL;
      anexo[6] = false;
      this.aprovacaoService.attDownloadMsg(anexoAprovId, data.nativeURL).subscribe();
    });

  }

  openFile(path, mimetype, anexoAprovId) {
    this.fileOpener.open(path, mimetype)
    .then(() => console.log('---------File is opened'))
    .catch(e => {
      const anexo = this.aprovacao.anexos.find(p => p[0] === anexoAprovId); // PEGAR ANEXO
      anexo.downurl = null;
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'Erro ao abrir o arquivo, favor baixa-lo novamente.', buttons: ['OK']}).then(alertEl => alertEl.present());
      console.log('-----------Error opening file', e);
    });
  }

}
