import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
import { DetalheImagemPage } from '../../modals/detalhe-imagem/detalhe-imagem.page';
import { GruposService } from '../grupos.service';
import { Grupo } from '../grupo.model';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { Plugins, Capacitor, CameraResultType, CameraSource } from '@capacitor/core';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-chat-grupo',
  templateUrl: './chat-grupo.page.html',
  styleUrls: ['./chat-grupo.page.scss'],
})
export class ChatGrupoPage implements OnInit {

  msgId = 1;
  messages = [];
  porcentagemDownload = 0;
  dataPresente;
  current_user_id;
  current_user_name;
  current_grupo;
  newMsg = '';
  primeiramsg = true;
  grupoAtual: Grupo;
  grupoloading = true;
  permissions = Plugins.Permissions;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  db = firebase.database();
  fileTransfer: FileTransferObject;

  constructor(
    private usuarioService: UsuariosService,
    private http: HttpClient,
    public authService: AuthService,
    private modalController: ModalController,
    private grupoService: GruposService,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private androidPermissions: AndroidPermissions,
    private loadingCtrl: LoadingController,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController
    ) {

    /*
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );
    */

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);


    this.current_grupo = window.localStorage.getItem('grupoId');

    console.log("GRUPOOO -- " + this.current_grupo);

    this.grupoService.getGrupo(this.current_grupo).subscribe(grupo => {
      this.grupoAtual = grupo;
      this.grupoloading = false;
    });

    const dbRef = this.db.ref('chat').orderByChild('grupo_id').equalTo(parseInt(this.current_grupo));

    dbRef.on('value', val => {
      let message;
      val.forEach(element => {
        const id = element.key;
        const value = element.val();
        const d = new Date();
        message = {
          msg_id: this.msgId,
          user_id: value.user_id,
          grupo_id: value.grupo_id,
          createdAt: d.getHours() + ':' + d.getMinutes(),
          user: value.user_name,
          msg: value.msg,
          url: value.url,
          tipo: value.tipo,
          data: this.dataPresente,
          porcentagem: 0,
          extensao: value.extensao,
          anexoNome: value.anexonome,
          id: value.idmsg,
          downurl: '',
          mimetype: value.mimetype,
          isdownloading: false
        };
      });
      if (!this.primeiramsg) {
        this.messages.push(message);
        this.msgId += 1;
      } else {
        this.primeiramsg = false;
      }

      setTimeout(() => {
        console.log("efefe");
        this.content.scrollToBottom(200);
      }, 500);

      // const projetoos = val.val();
      // console.log(projetoos);
      // this.projs = Object.keys(projetoos).map(i => projetoos[i]);
      // console.log(this.projs);

    });

   }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
        console.log(user);
        this.current_user_id = user.id;
        this.current_user_name = user.nome;
        // tslint:disable-next-line: max-line-length
      })
    ).subscribe();
    console.log('-------- AAAAAAAAA ----');

    this.grupoService.getMgsRails(this.current_grupo).subscribe(data => {
      this.messages = data;
      console.log(data);
      this.msgId = this.messages.length + 1;
    });
  }

  sendMessage() {

    this.sendMessageFB(this.newMsg);
    this.sendMessageRails(this.newMsg);
    this.newMsg = '';

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }

  sendMessageRails(msg) {
    // tslint:disable-next-line: max-line-length
    this.http.post(this.authService.urlServer + '/api/criar_msg', { grupo_id: this.current_grupo, user_id: this.current_user_id, msg: msg }).pipe(take(1), tap(usuData => {
        console.log('---- MSG ENVIADA FIREBASE');
        console.log(usuData);
      })
    ).subscribe();
  }

  sendMessageFB(msg) {
    console.log(this.current_grupo);
    console.log(this.current_user_id);
    console.log(this.current_user_name);
    console.log(msg);
    this.db.ref('chat').push({
      grupo_id: parseInt(this.current_grupo),
      user_id: parseInt(this.current_user_id),
      user_name: this.current_user_name,
      msg: msg,
      url: "",
      tipo: "msg",
      extensao: '',
      mimetype: '',
      anexonome: '',
      idmsg: ''
    });
  }

  async presentModal(url) {
    console.log("MODAAL");
    const modal = await this.modalController.create({
      component: DetalheImagemPage,
      componentProps: {
        'url': url
      }
    });
    return await modal.present();
  }

  downloadAnexo(url, extensao, msgId) {
    // this.downfunc(url, extensao, msgId);

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(r => {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(writeperm => {
        this.downfunc(url, extensao, msgId);
      });
    });
    /*
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => {
        if (result.hasPermission) {
          // code
          this.downfunc(url, extensao);
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
            if (result.hasPermission) {
              this.downfunc(url, extensao);
              // code
            }
          });
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );
    */

  }

  downfunc(url, extensao, msgId) {
    const mensagem = this.messages.find(p => p.msg_id === msgId);
    mensagem.isdownloading = true;
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.onProgress((progressEvent) => {
      console.log(progressEvent);
      const perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      mensagem.porcentagem = perc / 100;
      this.porcentagemDownload = perc;
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
      const mensagem = this.messages.find(p => p.msg_id === msgId);
      mensagem.downurl = null;
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'Erro ao abrir o arquivo, favor baixa-lo novamente.', buttons: ['OK']}).then(alertEl => alertEl.present());
      console.log('-----------Error opening file', e);
    });
  }


}
