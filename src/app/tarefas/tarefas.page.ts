import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { take, tap } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario.model';
import { TarefasService } from './tarefas.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  isLoading: boolean;
  tarefas = [];
  tarefasShow = [];
  currentUser: Usuario;

  constructor(private usuarioService: UsuariosService, private tarefasService: TarefasService) { }

  ngOnInit() {
    this.usuarioService.current_user.pipe(take(1), tap(user => {
        console.log(user);
        this.currentUser = user;
      })
    ).subscribe();
  }

  ionViewWillEnter() {
    this.tarefasService.getLista().subscribe(data => {
      this.tarefas = data;
      this.tarefasShow = data.filter(p => p.status === 'PENDENTE');
    });
    console.log(this.tarefas);
  }

  segmentChanged(evt) {

    console.log(evt.detail.value);

    if (evt.detail.value === 'pendentes') {
      this.tarefasShow = this.tarefas.filter(p => p.status === 'PENDENTE');
    } else {
      this.tarefasShow = this.tarefas.filter(p => p.status === 'FINALIZADO');
    }

  }
}
