import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, switchMap } from 'rxjs/operators';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router, private usuarioService: UsuariosService) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    return this.usuarioService.userIsAuthenticated.pipe(take(1), switchMap(isAuthenticated => {
      console.log("GUARD ANT --- "+isAuthenticated);

      if (!isAuthenticated) {
        console.log("Dgsgsegsd -- ");
        console.log(this.usuarioService.autoLogin());
        return this.usuarioService.autoLogin();
      } else {
        return of(isAuthenticated);
      }
    }), tap(isAuthenticated => {
      console.log("GUARD --- "+isAuthenticated);
      if (!isAuthenticated) {
        this.router.navigateByUrl('/auth');
      }
    }));
  }

}
