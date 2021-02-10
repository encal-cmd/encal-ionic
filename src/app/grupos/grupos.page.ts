import { Component, OnInit, OnDestroy } from '@angular/core';
import { GruposService } from './grupos.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Grupo } from './grupo.model';
import { Subscription } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit, OnDestroy {
  private grupossSub: Subscription;
  grupoList: Grupo[];
  isLoading: boolean;
  currentUser: Usuario;

  constructor(
    private grupoService: GruposService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.grupossSub = this.grupoService.grupos.subscribe(grupos => {
      console.log('CAREGAR GRUPOS');
      console.log(grupos);
      this.grupoList = grupos;
      this.isLoading = false;

      this.usuarioService.current_user.subscribe(user => {
        this.currentUser = user;
      });

    });
    this.attGrupos();
  }

  ngOnDestroy() {
    this.grupossSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.attGrupos();
  }

  attGrupos() {
    this.loadingCtrl.create({
      message: 'Listando Grupos...'
    }).then(loadingEl => {
      loadingEl.present();
      this.grupoService.getGruposRails().subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  toGrupo(grupoId) {
    window.localStorage.setItem('grupoId', grupoId);
    this.router.navigateByUrl('/grupos/show/tabs/chat');
  }

}
