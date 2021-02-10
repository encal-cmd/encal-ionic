import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuarios/usuario.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from '../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface GetRails {
  lista: [];
}

@Injectable({
  providedIn: 'root'
})
export class CalendariosService implements OnDestroy {
  currentUser: Usuario;
  private currentUserSub: Subscription;
  private _tarefas = new BehaviorSubject<any[]>([]);

  constructor(
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      this.currentUser = usuario;
    });
  }

  get tarefas() {
    return this._tarefas.asObservable();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  getLista() {
    console.log("efaaaaaaaaaaaaaaaaaaaaa");
    console.log(this.authService.urlServer + '/api/listar_calendario');
    // tslint:disable-next-line: max-line-length
    return this.http.post<GetRails>(this.authService.urlServer + '/api/listar_calendario', { user_id: this.currentUser.id })
    .pipe(map(resData => {
        console.log(resData);
        const msgData = resData.lista;
        const lista = [];
        for (const key in msgData) {
          if (msgData.hasOwnProperty(key)) {
            lista.push({
              titulo: msgData[key][0],
              descricao: msgData[key][1],
              status: msgData[key][2],
              data: new Date(msgData[key][3]),
              tipo: msgData[key][4],
              id: msgData[key][5],
            });
          }
        }
        return lista;
      })
    );
  }

}
