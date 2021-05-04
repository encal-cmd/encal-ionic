import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AprovacaoService } from '../aprovacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { PrestadoresService } from 'src/app/prestadores/prestadores.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nova-aprovacao',
  templateUrl: './nova-aprovacao.page.html',
  styleUrls: ['./nova-aprovacao.page.scss'],
})

export class NovaAprovacaoPage implements OnInit, OnDestroy {
  form: FormGroup;
  avaliadores = [];
  data = {};
  empresa = 'Encal';
  prestadores = [];
  usuariosSub: Subscription;
  avaliadoresSelect: Usuario[];
  isLoading;
  editMode = false;
  fileTransfer: FileTransferObject;
  globalUpOptions = [
    {
      nativepath: null,
      nomeArquivo: 'Novo Anexo',
      mime: '',
      enviado: false
    }
  ];
  nomeArquivo = "Novo Anexo"

  aprovacaoEdit = {
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
  };

  constructor(
    private loadingCtrl: LoadingController,
    private aprovacaoService: AprovacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private prestadoresService: PrestadoresService,
    private usuarioService: UsuariosService,
    private alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private authService: AuthService
    ) {
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      empresa: new FormControl('encal', { updateOn: 'blur' }),
      centroCusto: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      solicitante: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      dataSolicitacao: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      dataEntrega: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      valor: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      obsPagamento: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      avaliadores: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.usuariosSub = this.usuarioService.usuarios.subscribe(usuarios => {
      this.avaliadoresSelect = usuarios;

      this.prestadoresService.getLista().subscribe(data => {
        this.prestadores = data;
      });

      this.route.paramMap.subscribe(paramMap => {
        if (paramMap.get('id') !== 'new') {
          this.editMode = true;
          this.aprovacaoService.getAprovacao(paramMap.get('id')).subscribe(aprovacaoget => {
            const dataSoliSplit = aprovacaoget.dataSolicitacao.split('/');
            const dataentSplit = aprovacaoget.dataEntrega.split('/');
            const dataSoli = dataSoliSplit[2] + '-' + dataSoliSplit[1] + '-' + dataSoliSplit[0];
            const dataEnt = dataentSplit[2] + '-' + dataentSplit[1] + '-' + dataentSplit[0];
            this.aprovacaoEdit = aprovacaoget;
            this.form.patchValue({
              titulo: aprovacaoget.titulo,
              empresa: aprovacaoget.empresa,
              centroCusto: aprovacaoget.centroCusto,
              solicitante: aprovacaoget.solicitante,
              dataSolicitacao: dataSoli,
              dataEntrega: dataEnt,
              valor: parseInt(aprovacaoget.valor.toString()) * 100,
              obsPagamento: aprovacaoget.obsPagamento,
              avaliadores: usuarios.filter(p => aprovacaoget.avaliadores.split('||').includes(p.id.toString())),
            });
            this.isLoading = false;
          });
        }
      });

    });

  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.prestadoresService.getLista().subscribe(data => {
      this.prestadores = data;
    });
  }

  onCreateAprovacao() {
    const form_val = this.form.value;
    console.log(form_val);
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Criando aprovação...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.aprovacaoService.criarAprovacao(
        form_val.titulo,
        this.empresa,
        form_val.centroCusto,
        form_val.solicitante,
        form_val.dataSolicitacao,
        form_val.dataEntrega,
        form_val.valor,
        form_val.obsPagamento,
        form_val.avaliadores
        ).subscribe(resp => {
          if (resp.status === 'OK') {
            this.enviarArquivo(loadingEl, resp.aprovacao_id)
            
            // this.form.reset();
            // this.router.navigate(['/aprovacao']);
          } else {
          loadingEl.dismiss();
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }



  onEditAprovacao() {
    const form_val = this.form.value;
    console.log(form_val);
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Editando aprovação...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.aprovacaoService.editar(
        this.aprovacaoEdit.id,
        form_val.titulo,
        this.empresa,
        form_val.centroCusto,
        form_val.solicitante,
        form_val.dataSolicitacao,
        form_val.dataEntrega,
        form_val.favorecido,
        form_val.obsPagamento,
        form_val.avaliadores
        ).subscribe(resp => {
          loadingEl.dismiss();
          if (resp.status === 'OK') {
            this.form.reset();
            this.router.navigate(['/aprovacao']);
          } else {
            this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
          }
        });
    });
  }

  trocaEmpresa(event) {
    console.log(event);
    this.empresa = event.detail.value;
    console.log(this.empresa);
  }
  

  uploadFile(ind: number) {
    console.log("uploadFile")
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

        this.globalUpOptions[ind].nativepath = nativepath
        this.globalUpOptions[ind].nomeArquivo = nomeArquivo
        this.globalUpOptions[ind].mime = mime

        console.log(nomeArquivo)
        console.log(mime)
        console.log(extencao)

        this.nomeArquivo = nomeArquivo

      }, erro => {
        alert(JSON.stringify(erro));

      });
    }, erro => {
      alert(JSON.stringify(erro));
    });
  }

  enviarArquivo(loadingEl: any, solicitacaoId: any) {

    console.log("ENTRO ENVIAR ARQUIVO")
    console.log(loadingEl, solicitacaoId)

    const arquivosEnviar = this.globalUpOptions.find(n => n.enviado == false)

    if(arquivosEnviar != undefined && arquivosEnviar.nativepath != null) {
      
      const parametros = {solicitacao_id: solicitacaoId};
      const options: FileUploadOptions = {
        fileKey: 'file',
        fileName: arquivosEnviar.nomeArquivo,
        chunkedMode: false,
        headers: {},
        mimeType: arquivosEnviar.mime,
        params: parametros
      };
  
      this.fileTransfer.upload(arquivosEnviar.nativepath, this.authService.urlServer + '/api/up_file_aprovacao', options).then(data => {
        console.log('Transfer Done =' + JSON.stringify(data));
        arquivosEnviar.enviado = true
        this.enviarArquivo(loadingEl, solicitacaoId)
      }, erro => {
        console.log(JSON.stringify(erro));
        loadingEl.dismiss();
      });

    } else {
      loadingEl.dismiss();
      this.form.reset();
      this.router.navigate(['/aprovacao']);
    }

  }

  addAnexo() {
    this.globalUpOptions.push({
      nativepath: null,
      nomeArquivo: 'Novo Anexo',
      mime: '',
      enviado: false
    })
  }

  rmvFile(ind) {
    this.globalUpOptions.splice(ind, 1)
  }
}
