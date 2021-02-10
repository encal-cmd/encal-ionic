import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario.model';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;
  usuario: Usuario;
  isLoading = false;
  data = {};
  permissoes = [false, false, false, false, false, false];
  currentUser: Usuario;
  permissoesGet = [];

  constructor(
    private loadingCtrl: LoadingController,
    private usuarioService: UsuariosService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("ENTROO ")
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      this.usuarioService.getPermissoes().subscribe(data => {
        this.permissoesGet = data;
        console.log("efefefefef", this.permissoesGet);
        this.usuarioService.getUsuarioRails(paramMap.get('usuarioId')).subscribe(usuario => {
          console.log("ENTROO -- id  ", usuario);
          this.usuario = usuario;
          this.form = new FormGroup({
            cpf: new FormControl(usuario.cpf, { updateOn: 'blur', validators: [Validators.required] }),
            email: new FormControl(usuario.email, { updateOn: 'blur', validators: [Validators.required, Validators.email] }),
            nome: new FormControl(usuario.nome, { updateOn: 'blur', validators: [Validators.required] }),
            // tslint:disable-next-line: max-line-length
            permissoes: new FormControl(this.permissoesGet.filter(p => usuario.permissoesIds.split('||').includes(p.id.toString())), { updateOn: 'blur' }),
            novaSenha: new FormControl(null, { updateOn: 'blur' }),
            novaSenhaConf: new FormControl(null, { updateOn: 'blur' })
          });
          this.permissoes = usuario.permissoes;
          this.isLoading = false;
        });
      });
    });

    this.usuarioService.current_user.subscribe(user => {
      this.currentUser = user;
    });
  }

  attUsuario() {
    if (!this.validarForm()) {
      return;
    }
    console.log(this.form);

    const form_val = this.form.value;

    const permissoesString = [];
    const permissoesIds = [];
    // tslint:disable-next-line: forin
    for (const i in this.permissoesGet) {
      let check = undefined;
      if (form_val.permissoes !== null) {
        check = form_val.permissoes.find(p => p.id === this.permissoesGet[i].id);
      }
      console.log(this.permissoesGet[i].id);
      console.log(check);
      if (check !== undefined) {
        permissoesIds.push(this.permissoesGet[i].id);
        permissoesString.push('true');
      } else {
        permissoesString.push('false');
      }
    }


    this.loadingCtrl.create({
      message: 'Atualizando usuário...'
    }).then(loadingEl => {
      loadingEl.present();

      // tslint:disable-next-line: max-line-length
      this.usuarioService.updateUsuarioRails(this.usuario.id, this.form.value.nome, this.form.value.email, this.form.value.cpf, true, permissoesIds.join('||'), this.permissoes.join('||')).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.router.navigate(['/usuarios']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  validarForm() {
    const form_val = this.form.value;
    let msg = '';
    if (form_val.nome === '' || form_val.nome === null || form_val.nome === undefined) {
      msg = 'Nome é obrigatório.';
    } else if (form_val.email === '' || form_val.email === null || form_val.email === undefined) {
      msg = 'Email é obrigatório.';
    } else if (form_val.cpf === '' || form_val.cpf === null || form_val.cpf === undefined) {
      msg = 'CPF é obrigatório.';
    } else {
      return true;
    }

    this.alertCtrl.create({header: 'Ops!', message: msg, buttons: ['OK']}).then(alertEl => alertEl.present());
    return false;
  }

  resetarSenha() {
    // tslint:disable-next-line: max-line-length
    this.usuarioService.resetarSenha(this.usuario.id).subscribe(() => {
      this.alertCtrl.create({header: 'Sucesso!', message: 'Senha Resetada!', buttons: ['OK']}).then(alertEl => alertEl.present());
      // this.form.reset();
      // this.router.navigate(['/usuarios']);
    });
  }

  alterarSenha() {
    // tslint:disable-next-line: max-line-length
    if (this.form.value.novaSenha !== this.form.value.novaSenhaConf) {
      this.alertCtrl.create({header: 'Ops!', message: 'As senhas devem ser iguais!', buttons: ['OK']}).then(alertEl => alertEl.present());
    } else if (this.form.value.novaSenha.length < 6) {
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'As senhas devem ter ao menos 6 digitos!', buttons: ['OK']}).then(alertEl => alertEl.present());
    } else {
      this.usuarioService.alterarSenha(this.usuario.id, this.form.value.novaSenha).subscribe(() => {
        this.alertCtrl.create({header: 'Sucesso!', message: 'Senha Alterada!', buttons: ['OK']}).then(alertEl => alertEl.present());
        // this.form.reset();
        // this.router.navigate(['/usuarios']);
      });
    }
  }
}
