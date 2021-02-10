import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Usuario } from '../usuarios/usuario.model';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.page.html',
  styleUrls: ['./modal-usuarios.page.scss'],
})
export class ModalUsuariosPage implements OnInit, OnDestroy {
  private usuariosSub: Subscription;
  usuarioList: Usuario[];
  isLoading: boolean;
  avaliadores: Usuario[];
  @Input() avaliadoresSelecionados: string;
  avaliadoresSelecionadosArray = [];

  constructor(private usuarioService: UsuariosService, private modalController: ModalController) { }

  ngOnInit() {
    this.avaliadoresSelecionadosArray = this.avaliadoresSelecionados.split('||');
    this.isLoading = true;
    this.usuariosSub = this.usuarioService.usuarios.subscribe(usuarios => {
      this.usuarioList = usuarios;
      this.isLoading = false;
      this.setarUsuarioSelecionados(usuarios);
    });
    this.usuarioService.getUsuariosRails().subscribe();
  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

  async closeModal() {
    if (this.avaliadores === undefined) {
      await this.modalController.dismiss({
        'avaliadores': []
      });
    } else {
      await this.modalController.dismiss({
        'avaliadores': this.avaliadores
      });
    }

  }

  addAvaliadores(usuario: Usuario, element) {
    if (this.avaliadores !== undefined) {
      const ind = this.avaliadores.findIndex(p => p.id === usuario.id);
      if (!element.target.checked) {
        this.avaliadores.push(usuario);
      } else {
        this.avaliadores.splice(ind, 1);
      }
    } else {
      this.avaliadores = [usuario];
    }
  }

  setarUsuarioSelecionados(usuarios) {
    this.avaliadores = [];
    usuarios.forEach(usu => {
      if (this.avaliadoresSelecionadosArray.includes(usu.id.toString())) {
        this.avaliadores.push(usu);
      }
    });
  }

}
