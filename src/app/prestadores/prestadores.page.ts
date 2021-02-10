import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { take, tap } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario.model';
import { PrestadoresService } from './prestadores.service';

@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.page.html',
  styleUrls: ['./prestadores.page.scss'],
})
export class PrestadoresPage implements OnInit {
  isLoading: boolean;
  prestadores = [];
  currentUser: Usuario;

  constructor(private usuarioService: UsuariosService, private prestadoresService: PrestadoresService) { }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
        console.log(user);
        this.currentUser = user;
      })
    ).subscribe();
  }

  ionViewWillEnter() {
    this.prestadoresService.getLista().subscribe(data => {
      this.prestadores = data;
    });
  }
}
