import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { GruposService } from '../grupos.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { Subscription } from 'rxjs';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-novo-grupo',
  templateUrl: './novo-grupo.page.html',
  styleUrls: ['./novo-grupo.page.scss'],
})
export class NovoGrupoPage implements OnInit, OnDestroy {
  form: FormGroup;
  private usuariosSub: Subscription;
  usuarioList: Usuario[];
  isLoading = false;
  data = {};

  constructor(
    private loadingCtrl: LoadingController,
    private grupoService: GruposService,
    private router: Router,
    private usuarioService: UsuariosService,
    private modalController: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.usuariosSub = this.usuarioService.getUsuariosRails().subscribe();

    this.form = new FormGroup({
      nome: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      usuariosPermitidos: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.isLoading = true;
    this.usuariosSub = this.usuarioService.usuarios.subscribe(usuarios => {
      this.usuarioList = usuarios;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  onCreateGrupo() {
    if (!this.form.valid) {
      return;
    }
    const form_val = this.form.value;
    this.loadingCtrl.create({
      message: 'Criando grupo...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      form_val.usuariosPermitidos.join(':::');
      this.grupoService.criarGrupoRails(form_val.nome, form_val.usuariosPermitidos.join(':::')).subscribe(resp => {
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
