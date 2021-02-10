import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PrestadoresService } from '../prestadores.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-form-prestador',
  templateUrl: './form-prestador.page.html',
  styleUrls: ['./form-prestador.page.scss'],
})

export class FormPrestadorPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  avaliadores = [];
  avaliadoresString = '';
  data = {};
  currentUser: Usuario;
  private currentUserSub: Subscription;
  prestador = {
    id: 0,
    nome: '',
    banco: '',
    agencia: '',
    conta: '',
    cpf: '',
  };

  constructor(
    private loadingCtrl: LoadingController,
    private prestadorService: PrestadoresService,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController) {
      this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
        this.currentUser = usuario;
      });
    }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      banco: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      agencia: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      conta: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      cpf: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('id') !== 'new') {
        this.prestadorService.getItem(paramMap.get('id')).subscribe(prestador => {
          console.log(prestador);
          this.prestador = prestador;
          this.form.patchValue({
            nome: prestador.nome,
            banco: prestador.banco,
            agencia: prestador.agencia,
            conta: prestador.conta,
            cpf: prestador.cpf,
          });
          this.isLoading = false;
        });
      }
    });
  }

  onCreate() {
    const form_val = this.form.value;
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Criando prestador...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.prestadorService.criar(
        form_val.nome,
        form_val.banco,
        form_val.agencia,
        form_val.conta,
        form_val.cpf,
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/prestadores']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  onEditar() {
    const form_val = this.form.value;
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Editando prestador...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.prestadorService.editar(
        this.prestador.id,
        form_val.nome,
        form_val.banco,
        form_val.agencia,
        form_val.conta,
        form_val.cpf,
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/prestadores']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }
}
