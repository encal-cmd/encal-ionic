import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { take, tap } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario.model';
import { ProjetosService } from './projetos.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage implements OnInit {
  isLoading: boolean;
  projetos = [];
  projetosShow = [];
  currentUser: Usuario;

  constructor(private usuarioService: UsuariosService, private projetosService: ProjetosService) { }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
        console.log(user);
        this.currentUser = user;
      })
    ).subscribe();
  }

  ionViewWillEnter() {
    this.projetosService.getLista().subscribe(data => {
      this.projetos = data;
      this.projetosShow = data.filter(p => p.status === 'PENDENTE');
    });
  }

  segmentChanged(evt) {

    console.log(evt.detail.value);

    if (evt.detail.value === 'pendentes') {
      this.projetosShow = this.projetos.filter(p => p.status === 'PENDENTE');
    } else {
      this.projetosShow = this.projetos.filter(p => p.status === 'FINALIZADO');
    }

  }
}
