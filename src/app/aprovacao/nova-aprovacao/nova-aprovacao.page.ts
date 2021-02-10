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
    private alertCtrl: AlertController) {
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
}
