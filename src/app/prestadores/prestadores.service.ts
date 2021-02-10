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
  obj: [1, '', '', '', '', ''];
}

interface GetRails {
  lista: [];
}

@Injectable({
  providedIn: 'root'
})
export class PrestadoresService implements OnDestroy {
  currentUser: Usuario;
  private currentUserSub: Subscription;
  private _prestadores = new BehaviorSubject<any[]>([]);

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  get prestadores() {
    return this._prestadores.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  criar(
    nome,
    banco,
    agencia,
    conta,
    cpf) {
    let obj = {
      nome: nome,
      banco: banco,
      agencia: agencia,
      conta: conta,
      cpf: cpf };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/criar_prestadores', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  editar(
    id,
    nome,
    banco,
    agencia,
    conta,
    cpf) {
    let obj = {
      id: id,
      nome: nome,
      banco: banco,
      agencia: agencia,
      conta: conta,
      cpf: cpf };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAtt>(this.authService.urlServer + '/api/editar_prestadores', { user_id: this.currentUser.id, objeto: obj }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  getItem(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<DataRails>(this.authService.urlServer + '/api/get_prestadores', { id: id }).pipe(map(usuData => {
        return {
          id: usuData.obj[0],
          nome: usuData.obj[1],
          banco: usuData.obj[2],
          agencia: usuData.obj[3],
          conta: usuData.obj[4],
          cpf: usuData.obj[5]
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getLista() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_prestadores', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              id: msgData[key][0],
              nome: msgData[key][1],
              banco: msgData[key][2],
              agencia: msgData[key][3],
              conta: msgData[key][4],
              cpf: msgData[key][5]
            });
          }
        }
        return lista;
      })
    );
  }
}
