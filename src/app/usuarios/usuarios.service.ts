import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import SHA_256 from 'sha256';
import { Usuario } from './usuario.model';
import { BehaviorSubject, Subscribable, Subscription, from, of } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

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
    admin: boolean;
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
export class UsuariosService implements OnDestroy {
  private db = firebase.database();
  private _usuarios = new BehaviorSubject<Usuario[]>([]);
  private subGetUsuario: Subscription;
  private _user = new BehaviorSubject<Usuario>(null);
  private url = '';
  currentUser: Usuario;
  private currentUserSub: Subscription;
  onesignalId = '309c764d-4be2-4622-b38b-51e7a7d1c53f';

  constructor(private authService: AuthService, private http: HttpClient) {
    this.url = this.authService.urlServer;

    this.currentUserSub = this.current_user_obs.subscribe(usuario => {
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

  get current_user_obs() {
    return this._user.asObservable();
  }

  criarUsuarioRails(email: string, nome: string, cpf: string, permissoes: string, perms: string) {
    // tslint:disable-next-line: max-line-length
    let noUsuario = {id: Math.random().toString(), nome: nome, email: email, cpf: cpf, ativo: true, senha: '123456', permissoes: permissoes, grupoUsuIds: perms};
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoUsuRails>(this.authService.urlServer + '/api/criar_usuario', { user_id: this.currentUser.id, usuario: noUsuario}).pipe(take(1), tap(usuData => {
        if (usuData.status === 'OK') {
          this.getUsuariosRails().subscribe();
        }
        return usuData;
      })
    );
  }

  attOneSignalUsuario(usuarioId: number, onesignalid: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoUsuRails>(this.authService.urlServer + '/api/set_user_onesignal', { user_id: usuarioId, onesignal_id: onesignalid }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  setOnesignal(onesig) {
    console.log('---------SET ONE---');
    this.onesignalId = onesig;
  }

  getOnesignal() {
    return this.onesignalId;
  }

  updateUsuarioRails(usuarioId: number, nome: string, email: string, cpf: string, ativo: boolean, perms: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoUsuRails>(this.authService.urlServer + '/api/update_usuario', { user_id: this.currentUser.id, id: usuarioId, nome: nome, email: email, cpf: cpf, ativo: ativo, grupoUsuIds: perms }).pipe(take(1), tap(usuData => {
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
            usuarios.push(new Usuario(usuariosData[key][0], usuariosData[key][1], usuariosData[key][2], usuariosData[key][3], usuariosData[key][4]));
          }
        }
        return usuarios;
      }),
      tap(places => {
        this._usuarios.next(places);
      })
    );
  }


  getUsuarioRails(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(this.url + '/api/get_usuario', { id: id }).pipe(map(usuData => {
        // tslint:disable-next-line: max-line-length
        return new Usuario(usuData.usuario.id, usuData.usuario.nome, usuData.usuario.email, usuData.usuario.cpf, usuData.usuario.ativo, [], usuData.usuario.grupoUsuIds);
      })
    );
  }

  loginRails(cpf: string, senha: string) {

    return this.http.post<LoginUsuario>(this.url + '/api/login', { cpf: cpf, senha: senha }).pipe(take(1), map(usuData => {
        if (usuData.status == "OK") {
          console.log("usuData")
          console.log("usuData")
          console.log(usuData)
          let usuario: Usuario;
          // tslint:disable-next-line: max-line-length
          usuario = new Usuario(usuData.usuario.id, usuData.usuario.nome, usuData.usuario.email, usuData.usuario.cpf, usuData.usuario.ativo, usuData.usuario.permissoes, "", usuData.usuario.admin);
          this.setUserData(usuario);
          return usuario;
        } else {
          return usuData.status;
        }
      })
    );
  }

  private setUserData(usuario: Usuario) {
    // tslint:disable-next-line: radix
    this._user.next(usuario);
    this.currentUser = usuario;
    // tslint:disable-next-line: max-line-length
    const data = JSON.stringify({id: usuario.id, nome: usuario.nome, email: usuario.email, ativo: usuario.ativo, permissoes: usuario.permissoes, admin: usuario.admin});
    Plugins.Storage.set({key: 'usuarioData', value: data});
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({key: 'usuarioData'});
  }

  autoLogin() {
    return from(Plugins.Storage.get({key: 'usuarioData'})).pipe(map(storedData => {
      // tslint:disable-next-line: max-line-length
      const parsedData = JSON.parse(storedData.value) as {id: number, nome: string, email: string, cpf: string, ativo: boolean, permissoes: [], admin: boolean};
      if (!storedData || !storedData.value) {
        return null;
        // throw new Error('NO SOTRED DATA AUTH SEFVICE');
      }

      const user = new Usuario(parsedData.id, parsedData.nome, parsedData.email, parsedData.cpf, parsedData.ativo, parsedData.permissoes, "", parsedData.admin);
      return user;
    }), tap(user => {
      if (user) {
        this._user.next(user);
        // this.autoLogout(user.tokenDuration);
      }
    }), map(user => {
      if (user == null) {
        return null;
      }
      return user.ativo;
    }));
  }

  resetarSenha(usuarioId: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + '/api/resetar_senha', { id: usuarioId }).pipe(tap(usuData => {
      return usuData;
    })
  );
  }

  alterarSenha(usuarioId: number, senha: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + '/api/alterar_senha', { id: usuarioId, senha: senha }).pipe(tap(usuData => {
      return usuData;
    })
  );
  }

  fixPermissoes(permissoes) {
    return []
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

  getPermissoes() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_permissoes', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              id: msgData[key][0],
              nome: msgData[key][1]
            });
          }
        }
        return lista;
      })
    );
  }
}
