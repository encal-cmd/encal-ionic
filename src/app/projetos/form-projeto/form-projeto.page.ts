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
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.page.html',
  styleUrls: ['./form-projeto.page.scss'],
})

export class FormProjetoPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  avaliadores = [];
  avaliadoresString = '';
  data = {};
  currentUser: Usuario;
  responsavel: Usuario;
  usuarios = [];

  private currentUserSub: Subscription;
  projeto = {
    id: 0,
    titulo: '',
    status: '',
    etapas: [],
    etapa_atual: 0
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
      titulo: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.usuarioService.usuarios.subscribe(usuarios => {
      this.usuarios = usuarios;

      this.route.paramMap.subscribe(paramMap => {
        if (paramMap.get('id') !== 'new') {
          this.projetosService.getItem(paramMap.get('id')).subscribe(projeto => {
            console.log(projeto);
            this.projeto = projeto;
            this.form.patchValue({
              titulo: projeto.titulo
            });
            this.isLoading = false;
          });
        }
      });

    });
  }

  onCreate() {
    const formVal = this.form.value;
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Criando projeto...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.projetosService.criar(
        formVal.titulo,
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/projetos']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
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
      message: 'Editando projeto...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.projetosService.editar(
        this.projeto.id,
        formVal.titulo,
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/projetos']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

}
