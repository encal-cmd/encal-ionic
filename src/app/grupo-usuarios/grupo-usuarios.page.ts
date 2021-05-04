import { Component, OnInit, OnDestroy } from '@angular/core';
import { GrupoUsuariosService } from './grupo-usuarios.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-grupo-usuarios',
  templateUrl: './grupo-usuarios.page.html',
  styleUrls: ['./grupo-usuarios.page.scss'],
})
export class GrupoUsuariosPage implements OnInit, OnDestroy {
  private usuariosSub: Subscription;
  usuarioList: Usuario[];
  grupoUsuarioList = [];
  isLoading: boolean;
  currentUser: Usuario;

  constructor(private grupoUsuarioService: GrupoUsuariosService, private usuarioService: UsuariosService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    console.log('USUA PAGE TS --- on init STARRT');
    this.isLoading = true;

    this.grupoUsuarioService.getLista().subscribe(data => {
      this.grupoUsuarioList = data;
      this.isLoading = false;
    });    

    this.usuarioService.current_user.subscribe(user => {
      this.currentUser = user;
    });
    this.attUsuarios();
  }

  ionViewWillEnter() {
    this.grupoUsuarioService.getLista().subscribe(data => {
      this.grupoUsuarioList = data;
      this.isLoading = false;
    });    

  }
  
  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  attUsuarios() {
    this.loadingCtrl.create({
      message: 'Listando Usuarios...'
    }).then(loadingEl => {
      loadingEl.present();
      this.grupoUsuarioService.getLista().subscribe((data) => {
        this.grupoUsuarioList = data;
        loadingEl.dismiss();
      });
    });
  }

  onEdit(usuId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Editting item', usuId);
    this.router.navigate(['/', 'usuarios', 'edit', usuId]);
  }
}
