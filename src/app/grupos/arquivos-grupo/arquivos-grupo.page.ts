import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { take, tap } from 'rxjs/operators';
import { GruposService } from '../grupos.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DetalheImagemPage } from '../../modals/detalhe-imagem/detalhe-imagem.page';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-arquivos-grupo',
  templateUrl: './arquivos-grupo.page.html',
  styleUrls: ['./arquivos-grupo.page.scss'],
})
export class ArquivosGrupoPage implements OnInit {

  messages = [];
  current_user_id;
  current_user_name;
  current_grupo;
  imagens = [];
  data = {};
  downloadText: any;
  fileTransfer: FileTransferObject;


  constructor(
    private usuarioService: UsuariosService,
    private http: HttpClient,
    public authService: AuthService,
    private grupoService: GruposService,
    private modalController: ModalController,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private androidPermissions: AndroidPermissions,
    private router: Router,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) {
      this.current_grupo = window.localStorage.getItem('grupoId');
      this.downloadText = '';
  }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
      this.current_user_id = user.id;
      this.current_user_name = user.nome;
    })
    ).subscribe();
  }

  ionViewWillEnter() {
    this.grupoService.getImgGrupo(this.current_grupo).subscribe(grupo_imgs => {
      this.imagens = grupo_imgs.imagens;
    });

    this.grupoService.getAnexoGrupo(this.current_grupo).subscribe(data => {
      this.messages = data;
      console.log('datadatadata');
      console.log('datadatadata');
      console.log('datadatadata');
      console.log('datadatadata');
      console.log(data);
    });
  }

  onImagePicked(imageData: string) {
    // tslint:disable-next-line: max-line-length
    this.http.post(this.authService.urlServer + '/api/criar_msg_imagem', { grupo_id: this.current_grupo, user_id: this.current_user_id, base64: imageData }).pipe(take(1), tap(usuData => {
        console.log('---- get usuario');
        console.log(usuData);
      })
    ).subscribe();
  }

  async presentModal(url) {
    console.log("MODAAL");
    const modal = await this.modalController.create({
      component: DetalheImagemPage,
      componentProps: {
        'url': url
      }
    });
    this.data = modal.onDidDismiss();
    return await modal.present();
  }

  showdata() {
    console.log("------aaa------");
    console.log(this.data);
    console.log(this.data['__zone_symbol__value']['data']['permissoes']);
  }

  UploadFile() {
    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri).then(nativepath => {
        const indexdaextencao = nativepath.length - nativepath.lastIndexOf('.') - 1;
        const indexdonome = nativepath.length - nativepath.lastIndexOf('/') - 1;
        const extencao = nativepath.slice(-1 * indexdaextencao);
        const nomeArquivo = nativepath.slice(-1 * indexdonome);
        // alert(nativepath);
        const rand = Math.floor(Math.random() * 9999999);
        this.fileTransfer = this.transfer.create();
        let mime = '';
        switch (extencao) {
          case 'pdf':
            mime = 'application/pdf';
            // code block
            break;
          case 'xls':
          case 'xlsx':
            mime = 'application/vnd.ms-excel';
            // code block
            break;
          case 'doc':
            mime = 'application/msword';
            // code block
            break;
          case 'jpg':
          case 'jpeg':
            mime = 'image/jpeg';
            // code block
            break;
          default:
            mime = 'image/jpeg';
            // code block
        }
        const parametros = {grupo_id: this.current_grupo, user_id: this.current_user_id};
        const options: FileUploadOptions = {
          fileKey: 'file',
          fileName: nomeArquivo,
          chunkedMode: false,
          headers: {},
          mimeType: mime,
          params: parametros
        };

        this.loadingCtrl.create({
          message: 'Enviando Arquivo...'
        }).then(loadingEl => {
          loadingEl.present();
          this.fileTransfer.upload(nativepath, this.authService.urlServer + '/api/up_file', options).then(data => {
            console.log('Transfer Done =' + JSON.stringify(data));
            loadingEl.dismiss();
            this.router.navigateByUrl('/grupos/show/tabs/chat');
          }, erro => {
            console.log(JSON.stringify(erro));
            loadingEl.dismiss();
          });
        });


      }, erro => {
        alert(JSON.stringify(erro));

      });
    }, erro => {
      alert(JSON.stringify(erro));
    });
  }

  AbortUpload() {
    this.fileTransfer.abort();
    alert('upload cancel');
  }


  downloadAnexo(url, extensao, msgId) {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(r => {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(writeperm => {
        this.downfunc(url, extensao, msgId);
      });
    });
  }

  downfunc(url, extensao, msgId) {
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log("dowwwnad");
    console.log(msgId);
    const mensagem = this.messages.find(p => p.id === msgId);
    console.log(mensagem);
    mensagem.isdownloading = true;
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
      const perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      mensagem.porcentagem = perc / 100;
    });
    const rand = Math.floor(Math.random() * 9999999);
    this.fileTransfer.download(url, this.file.externalRootDirectory + 'anexo' + rand + '.' + extensao).then(data => {
      mensagem.downurl = data.nativeURL;
      mensagem.isdownloading = false;
      this.grupoService.attDownloadMsg(mensagem.id, data.nativeURL).subscribe();
    });

  }

  openFile(path, mimetype, msgId) {
    this.fileOpener.open(path, mimetype)
    .then(() => console.log('---------File is opened'))
    .catch(e => {
      const mensagem = this.messages.find(p => p.id === msgId);
      mensagem.downurl = null;
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'Erro ao abrir o arquivo, favor baixa-lo novamente.', buttons: ['OK']}).then(alertEl => alertEl.present());
      console.log('-----------Error opening file', e);
    });
  }


}
