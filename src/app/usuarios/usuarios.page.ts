import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Subscription } from 'rxjs';
import { Usuario } from './usuario.model';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit, OnDestroy {
  private usuariosSub: Subscription;
  usuarioList: Usuario[];
  isLoading: boolean;
  currentUser: Usuario;

  constructor(private usuarioService: UsuariosService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    console.log('USUA PAGE TS --- on init STARRT');
    this.isLoading = true;
    this.usuariosSub = this.usuarioService.usuarios.subscribe(usuarios => {
      console.log('USUA PAGE TS --- on init');
      console.log(usuarios);
      this.usuarioList = usuarios;
      this.isLoading = false;
    });

    this.usuarioService.current_user.subscribe(user => {
      this.currentUser = user;
    });
    this.attUsuarios();
  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  attUsuarios() {
    this.loadingCtrl.create({
      message: 'Listando Usuarios...'
    }).then(loadingEl => {
      loadingEl.present();
      this.usuarioService.getUsuariosRails().subscribe(() => {
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
