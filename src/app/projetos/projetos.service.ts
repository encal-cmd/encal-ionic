import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from '../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface NovoAtt {
  status: string;
}

interface DataRails {
  status: number;
  obj: [1, '', '', [], 1];
}

interface DataRailsEtapa {
  status: number;
  obj: [1, '', '', '', '', 1];
}

interface GetRails {
  lista: [];
}

@Injectable({
  providedIn: 'root'
})
export class ProjetosService implements OnDestroy {
  currentUser: Usuario;
  private currentUserSub: Subscription;
  private _projetos = new BehaviorSubject<any[]>([]);

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  get projetos() {
    return this._projetos.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  criar(titulo) {
    let obj = {
      titulo: titulo
    };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/criar_projeto', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  editar(
    id,
    titulo
    ) {
    let obj = {
      id: id,
      titulo: titulo };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/editar_projeto', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  editarEtapa(
    id,
    dataIni,
    dataFim
    ) {
    let obj = {
      id: id,
      data_ini: dataIni,
      data_fim: dataFim
    };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/editar_etapa_projeto', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  getItem(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<DataRails>(this.authService.urlServer + '/api/get_projeto', { id: id }).pipe(map(usuData => {
        return {
          id: usuData.obj[0],
          titulo: usuData.obj[1],
          status: usuData.obj[2],
          etapas: usuData.obj[3],
          etapa_atual: usuData.obj[4],
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getEtapa(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<DataRailsEtapa>(this.authService.urlServer + '/api/get_etapa_projeto', { id: id }).pipe(map(usuData => {
        return {
          id: usuData.obj[0],
          nome: usuData.obj[1],
          status: usuData.obj[2],
          dataIni: usuData.obj[3],
          dataFim: usuData.obj[4],
          projetoId: usuData.obj[5],
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getLista() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_projetos', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              id: msgData[key][0],
              titulo: msgData[key][1],
              status: msgData[key][2]
            });
          }
        }
        return lista;
      })
    );
  }

  finalizarEtapa(tarefaId) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/finalizar_etapa_projeto', { user_id: this.currentUser.id, id: tarefaId }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

}
