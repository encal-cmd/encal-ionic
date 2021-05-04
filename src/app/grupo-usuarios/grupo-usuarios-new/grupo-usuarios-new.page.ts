import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GrupoUsuariosService } from '../grupo-usuarios.service';

@Component({
  selector: 'app-grupo-usuarios-new',
  templateUrl: './grupo-usuarios-new.page.html',
  styleUrls: ['./grupo-usuarios-new.page.scss'],
})
export class GrupoUsuariosNewPage implements OnInit {
  form: FormGroup;
  data = {};
  permissoesGet = [];

  constructor(
    private loadingCtrl: LoadingController,
    private usuarioService: UsuariosService,
    private grupoUsuarioService: GrupoUsuariosService,
    private router: Router,
    private modalController: ModalController,
    private alertCtrl: AlertController
    ) {
      this.usuarioService.getPermissoes().subscribe(data => {
        this.permissoesGet = data;
      });
      console.log(this.permissoesGet);
    }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      permissoes: new FormControl(null, { updateOn: 'blur' })
    });
  }

  onCreateGrupoUsuario() {

    if (!this.validarForm()) {
      return;
    }

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
      message: 'Criando usuário...'
    }).then(loadingEl => {
      // loadingEl.present();


      // tslint:disable-next-line: max-line-length
      // this.usuarioService.criarUsuarioRails("nome@tef.com", "nome", "12523652588", "true||true||true||true||true||true").subscribe(resp => {
      // tslint:disable-next-line: max-line-length
      this.grupoUsuarioService.criarGrupoUsuario(form_val.nome, permissoesIds.join('||')).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/grupo_usuarios']);
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
    } else {
      return true;
    }

    this.alertCtrl.create({header: 'Ops!', message: msg, buttons: ['OK']}).then(alertEl => alertEl.present());
    return false;
  }
}
