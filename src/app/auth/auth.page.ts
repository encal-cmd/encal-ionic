import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuariosService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      cpf: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      senha: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
    });
  }

  onLogin(cpf: string, password: string) {
    // this.router.navigate(['/introducao']);

    // this.usuarioService.login(email, password)

    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...'  }).then( loadingEl => {
      loadingEl.present();

      this.usuarioService.loginRails(cpf, password).subscribe(resData => {
        console.log(resData);
        loadingEl.dismiss();
        let message = '';
        if (resData === 'USUARIO_NAO_ENCONTRADO') {
          message = 'CPF não encontrado!';
        } else if (resData === 'SENHA_ERRADA') {
          message = 'Senha errada.';
        }
        if (message !== '') {
          this.alertCtrl.create({header: 'Ops!', message: message, buttons: ['OK']}).then(alertEl => alertEl.present());
        } else {
          console.log("PRORJGJEGJEGJEGJ")
          this.router.navigate(['/introducao']);
        }
      });
    });

  }

  onSubmit() {
    // console.log(form);
    if (!this.form.valid) {
      return;
    }
    const cpf = this.form.value.cpf;
    const senha = this.form.value.senha;
    console.log(cpf, senha);

    this.onLogin(cpf, senha);

    // this.authenticate(email, password);
    // this.form.reset();
  }

}
