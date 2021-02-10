import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario.model';
import { Grupo } from '../grupos/grupo.model';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { UsuariosService } from '../usuarios/usuarios.service';

interface GrupoData {
  id: boolean;
  nome: string;
  usuariosPermitidos: string;
}

interface GetGrupoRails {
  grupos: [];
}

interface GetImgRails {
  imagens: [];
}

interface GetMsgRails {
  mensagens: [];
}

interface NovoAttGrupo {
  status: string;
}

interface NovoGrupoRails {
  status: number;
  grupo_id: string;
}

interface GrupoDataRails {
  status: number;
  grupo: {
    id: string;
    usuariosPermitidos: string;
    nome: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GruposService implements OnDestroy {

  currentUser: Usuario;
  private currentUserSub: Subscription;

  constructor(private authService: AuthService, private usuarioService: UsuariosService, private http: HttpClient) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }
  private _grupos = new BehaviorSubject<Grupo[]>([]);

  get grupos() {
    return this._grupos.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  criarGrupoRails(nome: string, usuarios: string) {
    let noGrupo = {id: 1, nome: nome, usuariosPermitidos: usuarios };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttGrupo>(this.authService.urlServer + '/api/criar_grupo', { user_id: this.currentUser.id, grupo: noGrupo }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  atualizarGrupoRailss(grupo_id: string, nome: string, usuarios: string) {
    let noGrupo = {id: grupo_id, nome: nome, usuariosPermitidos: usuarios };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttGrupo>(this.authService.urlServer + '/api/att_grupo', { user_id: this.currentUser.id, grupo: noGrupo }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  getGrupo(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GrupoDataRails>(this.authService.urlServer + '/api/get_grupo', { grupo_id: id }).pipe(map(usuData => {
        return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getGruposRails() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetGrupoRails>(this.authService.urlServer + '/api/listar_grupos', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        console.log(resData.grupos);
        const usuariosData = resData.grupos;
        const grupos = [];
        for (const key in usuariosData) {
          if (usuariosData.hasOwnProperty(key)) {
            // tslint:disable-next-line: max-line-length
            grupos.push(new Grupo(usuariosData[key][0], usuariosData[key][1], usuariosData[key][2], usuariosData[key][3]));
          }
        }
        return grupos;
      }),
      tap(grupos => {
        this._grupos.next(grupos);
      })
    );
  }

  getMgsRails(grupoId) {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    console.log(this.usuarioService.getOnesignal());


    // tslint:disable-next-line: max-line-length
    return this.http.post<GetMsgRails>(this.authService.urlServer + '/api/listar_mesagens', {
      user_id: this.currentUser.id,
      grupo_id: grupoId,
      onesigId: this.usuarioService.getOnesignal(),
    })
    .pipe(map(resData => {
        const msgData = resData.mensagens;
        const mensagens = [];
        let msgId = 1;
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            mensagens.push({
              msg_id: msgId,
              user_id: msgData[key][0],
              grupo_id: msgData[key][1],
              createdAt: msgData[key][2],
              user: msgData[key][3],
              msg: msgData[key][4],
              url: msgData[key][5],
              tipo: msgData[key][6],
              data: msgData[key][7],
              porcentagem: 0,
              extensao: msgData[key][8],
              anexoNome: msgData[key][9],
              id: msgData[key][10],
              downurl: msgData[key][11],
              mimetype: msgData[key][12],
              isdownloading: false,
            });
            msgId += 1;
          }
        }
        return mensagens;
      })
    );
  }

  attDownloadMsg(msgId, url) {
    console.log('---------attDownloadMsg---', msgId, url);
    const onesig = this.usuarioService.getOnesignal();
    // tslint:disable-next-line: max-line-length
    return this.http.post<GrupoDataRails>(this.authService.urlServer + '/api/attdownload', { msg_id: msgId, onesig: onesig, url: url, user_id: this.currentUser.id }).pipe(map(usuData => {
        return usuData;
      })
    );
  }

  getImgGrupo(grupo_id) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetImgRails>(this.authService.urlServer + '/api/listar_grupos_img', { grupo_id: grupo_id, user_id: this.currentUser.id })
    .pipe(tap(resData => {
        // console.log(resData);
        // console.log(resData.imagens);
        const imagensData = resData.imagens;
        const imagens = [];
        for (const key in imagensData) {
          if (imagensData.hasOwnProperty(key)) {
            //console.log('---------asvavasvas---');
            //console.log(imagensData[key]);
            // tslint:disable-next-line: max-line-length
            imagens.push(imagensData[key][0]);
          }
        }
        return imagens;
      })
    );
  }

  getAnexoGrupo(grupoId) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetMsgRails>(this.authService.urlServer + '/api/listar_anexos_grupo', {
      user_id: this.currentUser.id,
      grupo_id: grupoId,
      onesigId: this.usuarioService.getOnesignal(),
    })
    .pipe(map(resData => {
        const msgData = resData.mensagens;
        const mensagens = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            mensagens.push({
              user_id: msgData[key][0],
              grupo_id: msgData[key][1],
              createdAt: msgData[key][2],
              user: msgData[key][3],
              msg: msgData[key][4],
              url: msgData[key][5],
              tipo: msgData[key][6],
              data: msgData[key][7],
              porcentagem: 0,
              extensao: msgData[key][8],
              anexoNome: msgData[key][9],
              id: msgData[key][10],
              downurl: msgData[key][11],
              mimetype: msgData[key][12],
              isdownloading: false,
            });
          }
        }
        return mensagens;
      })
    );
  }
}
