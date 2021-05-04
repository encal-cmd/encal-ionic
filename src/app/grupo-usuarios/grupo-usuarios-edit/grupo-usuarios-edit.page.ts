import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../usuarios/usuario.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GrupoUsuariosService } from '../grupo-usuarios.service';

@Component({
  selector: 'app-grupo-usuarios-edit',
  templateUrl: './grupo-usuarios-edit.page.html',
  styleUrls: ['./grupo-usuarios-edit.page.scss'],
})
export class GrupoUsuariosEditPage implements OnInit {
  form: FormGroup;
  grupoUsuario: any;
  isLoading = false;
  data = {};
  permissoes = [false, false, false, false, false, false];
  currentUser: Usuario;
  permissoesGet = [];

  constructor(
    private loadingCtrl: LoadingController,
    private usuarioService: UsuariosService,
    private grupoUsuarioService: GrupoUsuariosService,
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
        this.grupoUsuarioService.getGrupoUsuario(paramMap.get('usuarioId')).subscribe(grupoUsuario => {
          console.log("ENTROO -- EDIT GRUPO USUARIO -- id  ", grupoUsuario);
          this.grupoUsuario = grupoUsuario;
          this.form = new FormGroup({
            nome: new FormControl(grupoUsuario.nome, { updateOn: 'blur', validators: [Validators.required] }),
            // tslint:disable-next-line: max-line-length
            permissoes: new FormControl(this.permissoesGet.filter(p => grupoUsuario.permissoesIds.split('||').includes(p.id.toString())), { updateOn: 'blur' }),
          });
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
      if (check !== undefined) {
        permissoesIds.push(this.permissoesGet[i].id);
        permissoesString.push('true');
      } else {
        permissoesString.push('false');
      }
    }


    this.loadingCtrl.create({
      message: 'Atualizando grupo de usuários...'
    }).then(loadingEl => {
      loadingEl.present();

      // tslint:disable-next-line: max-line-length
      this.grupoUsuarioService.updateGrupoUsuario(this.grupoUsuario.id, this.form.value.nome, permissoesIds.join('||')).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
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
