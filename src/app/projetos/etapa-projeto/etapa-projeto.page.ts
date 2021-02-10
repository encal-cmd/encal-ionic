import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ProjetosService } from '../projetos.service';
import { IonicSelectableComponent } from 'ionic-selectable';


@Component({
  selector: 'app-etapa-projeto',
  templateUrl: './etapa-projeto.page.html',
  styleUrls: ['./etapa-projeto.page.scss'],
})

export class EtapaProjetoPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  avaliadores = [];
  avaliadoresString = '';
  data = {};
  currentUser: Usuario;
  responsavel: Usuario;
  usuarios = [];

  private currentUserSub: Subscription;
  etapa = {
    id: 0,
    nome: '',
    status: '',
    dataIni: '',
    dataFim: '',
    projetoId: 0,
  };
  projeto = {
    id: 0,
    titulo: '',
    status: '',
    etapas: [],
    etapa_atual: 1
  };

  constructor(
    private loadingCtrl: LoadingController,
    private projetosService: ProjetosService,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController) {
      this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
        this.currentUser = usuario;
      });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }


  ngOnInit() {
    this.form = new FormGroup({
      data_ini: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      data_fim: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.usuarioService.usuarios.subscribe(usuarios => {
      this.usuarios = usuarios;

      this.route.paramMap.subscribe(paramMap => {
        if (paramMap.get('id') !== 'new') {
          this.projetosService.getEtapa(paramMap.get('id')).subscribe(etapa => {
            console.log(etapa);
            this.etapa = etapa;
            this.form.patchValue({
              data_ini: etapa.dataIni,
              data_fim: etapa.dataFim
            });
            this.isLoading = false;

            this.projetosService.getItem(etapa.projetoId.toString()).subscribe(projeto => {
              console.log(projeto);
              this.projeto = projeto;
            });

          });
        }
      });

    });
  }

  onEditar() {
    const formVal = this.form.value;
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Editando etapa...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.projetosService.editarEtapa(
        this.etapa.id,
        formVal.data_ini,
        formVal.data_fim
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/projetos/form/' + this.projeto.id]);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  onFinalizar() {
    this.loadingCtrl.create({
      message: 'Finalizando...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.projetosService.finalizarEtapa(this.etapa.id).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/projetos/form/' + this.projeto.id]);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

}
