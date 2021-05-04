import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import SHA_256 from 'sha256';
import { Usuario } from '../usuarios/usuario.model';
import { BehaviorSubject, Subscribable, Subscription, from, of } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { UsuariosService } from '../usuarios/usuarios.service';

interface UsuarioData {
  ativo: boolean;
  email: string;
  cpf: string;
  nome: string;
  senha: string;
}

interface GetUsuariosRails {
  usuarios: [];
}

interface LoginUsuario {
  status: string;
  usuario: {
    ativo: boolean;
    id: number;
    email: string;
    cpf: string;
    nome: string;
    permissoes: string;
  };
}

interface NovoUsuRails {
  status: string;
}

interface GetRails {
  lista: [];
}




@Injectable({
  providedIn: 'root'
})
export class GrupoUsuariosService implements OnDestroy {
  private db = firebase.database();
  private _usuarios = new BehaviorSubject<Usuario[]>([]);
  private subGetUsuario: Subscription;
  private _user = new BehaviorSubject<Usuario>(null);
  private url = '';
  currentUser: Usuario;
  private currentUserSub: Subscription;
  onesignalId = '309c764d-4be2-4622-b38b-51e7a7d1c53f';

  constructor(private authService: AuthService, private usuarioService: UsuariosService, private http: HttpClient) {
    this.url = this.authService.urlServer;

    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      console.log("DEVEEEE JJSDSDDSDSD")
      console.log(usuario)
      this.currentUser = usuario;
    });
    this.getUsuariosRails().subscribe();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        // console.log(user._token);
        return user.ativo;
        // return this.user_autenticado;
      } else {
        return false;
      }
    }));
  }

  get usuarios() {
    return this._usuarios.asObservable();
  }

  sha_256_encryp(password: string) {
    const myPass = SHA_256(password).toString();
    return myPass;
  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get current_user() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user;
      } else {
        return null;
      }
    }));
  }

  criarGrupoUsuario(nome: string, perms: string) {
    // tslint:disable-next-line: max-line-length
    let grupoUsuario = {id: Math.random().toString(), nome: nome, permissoesIds: perms};
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoUsuRails>(this.authService.urlServer + '/api/criar_grupo_usuario', { user_id: this.currentUser.id, grupo_usuario: grupoUsuario}).pipe(take(1), tap(usuData => {
        if (usuData.status === 'OK') {
          this.getUsuariosRails().subscribe();
        }
        return usuData;
      })
    );
  }

  updateGrupoUsuario(grupoUsuarioId: number, nome: string, perms: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoUsuRails>(this.authService.urlServer + '/api/update_grupo_usuario', { user_id: this.currentUser.id, id: grupoUsuarioId, nome: nome, permissoesIds: perms }).pipe(take(1), tap(usuData => {
        if (usuData.status === 'OK') {
          this.getUsuariosRails().subscribe();
        }
        return usuData;
      })
    );
  }

  getUsuariosRails() {
    // tslint:disable-next-line: max-line-length
    return this.http.get<GetUsuariosRails>(this.url + '/api/listar_usuarios')
    .pipe(map(resData => {
        const usuariosData = resData.usuarios;
        const usuarios = [];
        for (const key in usuariosData) {
          if (usuariosData.hasOwnProperty(key)) {
            // tslint:disable-next-line: max-line-length
            usuarios.push(new Usuario(usuariosData[key][0], usuariosData[key][1], usuariosData[key][2], usuariosData[key][3], usuariosData[key][4], this.fixPermissoes(usuariosData[key][5])));
          }
        }
        return usuarios;
      }),
      tap(places => {
        this._usuarios.next(places);
      })
    );
  }

  getLista() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_grupo_usuarios', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              id: msgData[key][0],
              nome: msgData[key][1],
              permissoes: msgData[key][2]
            });
          }
        }
        return lista;
      })
    );
  }

  getGrupoUsuario(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(this.authService.urlServer + '/api/get_grupo_usuario', { id: id }).pipe(map(usuData => {
        return {
          id: usuData.obj[0],
          nome: usuData.obj[1],
          permissoesIds: usuData.obj[2]
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  fixPermissoes(permissoes) {
    const perms = permissoes.split('||');
    const returnPerms = [];
    for (const i in perms) {
      if (perms[i] === 'true') {
        returnPerms.push(true);
      } else {
        returnPerms.push(false);
      }
    }
    return returnPerms;
  }
}
