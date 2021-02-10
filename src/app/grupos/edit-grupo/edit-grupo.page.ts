import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GruposService } from '../grupos.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Grupo } from '../grupo.model';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.page.html',
  styleUrls: ['./edit-grupo.page.scss'],
})
export class EditGrupoPage implements OnInit, OnDestroy {
  form: FormGroup;
  private usuariosSub: Subscription;
  usuarioList: Usuario[];
  isLoading = false;
  grupo: Grupo;
  usuariosPermitidos: string[];

  constructor(
    private loadingCtrl: LoadingController,
    private grupoService: GruposService,
    private router: Router,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.usuariosSub = this.usuarioService.getUsuariosRails().subscribe();
    console.log("ENTROO ")
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      this.grupoService.getGrupo(paramMap.get('grupoId')).subscribe(grupo => {
        console.log("ENTROO GRUPO -- id  ", grupo);
        this.grupo = grupo;
        this.usuariosPermitidos = grupo.usuariosPermitidos.split(':::');
        this.form = new FormGroup({
          nome: new FormControl(grupo.nome, { updateOn: 'blur', validators: [Validators.required] }),
          usuariosPermitidos: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
        });

        this.usuariosSub = this.usuarioService.usuarios.subscribe(usuarios => {
          this.usuarioList = usuarios;
          this.isLoading = false;
        });
      });
    });
  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  editarGrupo() {

    console.log(this.form.value);
    console.log(this.form.value);
    console.log(this.form.value);


    if (this.form.value.nome === '') {
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'O nome não pode ficar em branco!', buttons: ['OK']}).then(alertEl => alertEl.present());
    } else if (this.form.value.usuariosPermitidos !== null && this.form.value.usuariosPermitidos.length === 0) {
      // tslint:disable-next-line: max-line-length
      this.alertCtrl.create({header: 'Ops!', message: 'Tem que ter ao menos um usuário!', buttons: ['OK']}).then(alertEl => alertEl.present());
    } else {
      let usuariosPerms = [];

      if (this.form.value.usuariosPermitidos === null) {
        usuariosPerms = this.usuariosPermitidos;
      } else {
        usuariosPerms = this.form.value.usuariosPermitidos;
      }
      const form_val = this.form.value;
      this.loadingCtrl.create({
        message: 'Criando grupo...'
      }).then(loadingEl => {
        loadingEl.present();
        // tslint:disable-next-line: max-line-length
        this.grupoService.atualizarGrupoRailss(this.grupo.id, form_val.nome, usuariosPerms.join(':::')).subscribe(resp => {
          loadingEl.dismiss();
          if (resp.status === 'OK') {
            this.form.reset();
            this.router.navigate(['/grupos']);
          } else {
            this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
          }
        });
      });
    }

  }
}
