import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from '../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface NovoAttAprov {
  status: string;
  aprovacao_id: string;
}

interface AprovDataRails {
  status: number;
  aprovacao: [1, '', '', '', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', 1];
}

interface GetAprovRails {
  aprovacoes: [];
}

@Injectable({
  providedIn: 'root'
})
export class AprovacaoService implements OnDestroy {
  currentUser: Usuario;
  private currentUserSub: Subscription;
  private _aprovacoes = new BehaviorSubject<any[]>([]);

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  get aprovacoes() {
    return this._aprovacoes.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  criarAprovacao(
    titulo,
    empresa,
    centroCusto,
    solicitante,
    dataSolicitacao,
    dataEntrega,
    valor,
    obsPagamento,
    usuarios: string) {
    let novaAprov = {
      titulo: titulo,
      empresa: empresa,
      centroCusto: centroCusto,
      solicitante: solicitante,
      dataSolicitacao: dataSolicitacao,
      dataEntrega: dataEntrega,
      valor: valor,
      prestador_id: null,
      obsPagamento: obsPagamento,
      avaliadores: usuarios };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttAprov>(this.authService.urlServer + '/api/criar_aprovacao', { user_id: this.currentUser.id, aprovacao: novaAprov }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  editar(
    id,
    titulo,
    empresa,
    centroCusto,
    solicitante,
    dataSolicitacao,
    dataEntrega,
    prestador,
    obsPagamento,
    usuarios: string) {
    let novaAprov = {
      id: id,
      titulo: titulo,
      empresa: empresa,
      centroCusto: centroCusto,
      solicitante: solicitante,
      dataSolicitacao: dataSolicitacao,
      dataEntrega: dataEntrega,
      prestador_id: prestador.id,
      obsPagamento: obsPagamento,
      avaliadores: usuarios };
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttAprov>(this.authService.urlServer + '/api/editar_aprovacao', { user_id: this.currentUser.id, aprovacao: novaAprov }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  getAprovacao(id: string) {
    // tslint:disable-next-line: max-line-length

    return this.http.post<any>(this.authService.urlServer + '/api/get_aprovacao', { aprovacao_id: id, onesigId: this.usuarioService.getOnesignal(), user_id: this.currentUser.id }).pipe(map(usuData => {
        return {
          id: usuData.aprovacao[0],
          empresa: usuData.aprovacao[1],
          centroCusto: usuData.aprovacao[2],
          solicitante: usuData.aprovacao[3],
          dataSolicitacao: usuData.aprovacao[4],
          dataEntrega: usuData.aprovacao[5],
          valor: usuData.aprovacao[6],
          obsPagamento: usuData.aprovacao[7],
          avaliadores: usuData.aprovacao[8],
          user_criou_id: usuData.aprovacao[9],
          status: usuData.aprovacao[10],
          user_avaliou: usuData.aprovacao[11],
          titulo: usuData.aprovacao[12],
          prestadorNome: usuData.aprovacao[13],
          prestadorBanco: usuData.aprovacao[14],
          prestadorAgencia: usuData.aprovacao[15],
          prestadorConta: usuData.aprovacao[16],
          prestadorCpf: usuData.aprovacao[17],
          prestadorId: usuData.aprovacao[18],
          anexos: usuData.aprovacao[19]
        };
        // return new Grupo(usuData.grupo.id, usuData.grupo.nome, usuData.grupo.usuariosPermitidos);
      })
    );
  }

  getAprovacoes() {
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetAprovRails>(this.authService.urlServer + '/api/listar_aprovacoes', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        const msgData = resData.aprovacoes;
        const aprovacoes = [];
        console.log("-aaa-aaaa--aaaaaaaaaa")
        console.log(msgData);
        console.log("-aaa-aaaa--aaaaaaaaaa")
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            aprovacoes.push({
              id: msgData[key][0],
              empresa: msgData[key][1],
              centroCusto: msgData[key][2],
              solicitante: msgData[key][3],
              dataSolicitacao: msgData[key][4],
              dataEntrega: msgData[key][5],
              valor: msgData[key][6],
              obsPagamento: msgData[key][7],
              avaliadores: msgData[key][8],
              user_criou_id: msgData[key][9],
              status: msgData[key][10],
              user_avaliou: msgData[key][11],
              titulo: msgData[key][12],
            });
          }
        }
        return aprovacoes;
      })
    );
  }

  avaliarAprovacao(aprovacaoId: number, acao: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttAprov>(this.authService.urlServer + '/api/avaliar_aprovacao', { user_id: this.currentUser.id, aprovacao_id: aprovacaoId, acao: acao }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  apagarAprovacao(aprovacaoId: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<NovoAttAprov>(this.authService.urlServer + '/api/apagar_aprovacao', { user_id: this.currentUser.id, aprovacao_id: aprovacaoId }).pipe(take(1), tap(usuData => {
        return usuData;
      })
    );
  }

  attDownloadMsg(anexoId, url) {
    console.log('---------attDownloadMsg---', anexoId, url);
    const onesig = this.usuarioService.getOnesignal();
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(this.authService.urlServer + '/api/attdownload_aprovacao', { anexo_aprovacao_id: anexoId, onesig: onesig, url: url, user_id: this.currentUser.id }).pipe(map(usuData => {
        return usuData;
      })
    );
  }

}
