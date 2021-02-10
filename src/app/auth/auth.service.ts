import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap, take } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<User>(null);
  private activeAuthTimer: any;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        // console.log(user._token);
        // console.log("userIsAuthenticated SERVICE", !!user._token);
        return !!user._token;
        // return this.user_autenticado;
      } else {
        return false;
      }
    }));
  }

  constructor(private http: HttpClient) {  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get urlServer() {
    return 'http://localhost:3000';
    return 'https://redeencal.com.br';
    return 'https://927fd287695a.ngrok.io';
    return 'http://64.225.63.183';
  }


  login_u() {
    const expirationDate = new Date(new Date().getTime() + 9999 * 1000);

    const user_id = "1";
    const user_email = "email@email";
    const user_token = "sg32244gwrgwwgrsrsggs";

    const user = new User(user_id, user_email, user_token, expirationDate);
    this._user.next(user);
    const data = JSON.stringify({userId: user_id, token: user_token, tokenExpirationDate: expirationDate.toISOString(), email: user_email});
    Plugins.Storage.set({key: 'authData', value: data});

  }

  login() {
    const email = 'auth@auth.com.br';
    const password = 'sdgmklsegmklsrgg';
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      password: password,
      returnSecureToken: true
    }).pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if (this.activeAuthTimer) {
      clearTimeout(this.activeAuthTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'});
  }

  autoLogin() {
    return from(Plugins.Storage.get({key: 'authData'})).pipe(map(storedData => {
      if (!storedData || !storedData.value) {
        return null;
        // throw new Error('NO SOTRED DATA AUTH SEFVICE');
      }

      const parsedData = JSON.parse(storedData.value) as {userId: string, token: string, tokenExpirationDate: string, email: string};
      const expirationTime = new Date(parsedData.tokenExpirationDate);
      if (expirationTime <= new Date()) {
        return null;
      }

      const user = new User(parsedData.userId, parsedData.email, parsedData.token, expirationTime);
      return user;
    }), tap(user => {
      if (user) {
        this._user.next(user);
        // this.autoLogout(user.tokenDuration);
      }
    }), map(user => {
      return !!user;
    }));
  }

  signup(email: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      password: '123456',
      returnSecureToken: true
    });
  }

  private setUserData(userData: AuthResponseData) {
    // tslint:disable-next-line: radix
    const expirationDate = new Date(new Date().getTime() + parseInt(userData.expiresIn) * 1000);
    const user = new User(userData.localId, userData.email, userData.idToken, expirationDate);
    this._user.next(user);
    this.autoAutenticate(); // Att a cada 50 min
    this.storeAuthData(userData.localId, userData.idToken, expirationDate.toISOString(), userData.email);
  }

  private storeAuthData(userId: string, token: string, tokenExpirationDate: string, email: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const data = JSON.stringify({userId: userId, token: token, tokenExpirationDate: tokenExpirationDate, email: email});
    Plugins.Storage.set({key: 'authData', value: data});
  }

  private autoAutenticate() {
    if (this.activeAuthTimer) {
      clearInterval(this.activeAuthTimer);
    }
    this.activeAuthTimer = setInterval(() => {
      this.login();
    }, 3000000);
  }
}
