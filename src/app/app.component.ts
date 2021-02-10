import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios/usuarios.service';
import { Usuario } from './usuarios/usuario.model';
import { take, tap } from 'rxjs/operators';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private currentUserSub: Subscription;
  currentUser: Usuario;
  isLoading = true;
  onesignalId: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServices: AuthService,
    private router: Router,
    private usuarioService: UsuariosService,
    private oneSignal: OneSignal
    ) {
      this.initializeApp();
      this.login_auth();
  }
  private authSub: Subscription;
  private logAuthSub: Subscription;
  private previousAuthState = false;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupPush();
    });
  }

  setupPush() {


    this.oneSignal.startInit('da5bb7a2-00f8-4809-90b0-525a4b5143f2', '1023896680033');
    console.log('OneSig - Iniciado');

    // DESATIVAR PARA QUE NAO ACONTECA NADA ENQUANTO O APP TA ABERTO
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    console.log('OneSig - inFocus');

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      console.log('---- handleNotificationReceived ----');
      console.log('---- handleNotificationReceived ----');
      console.log(data);
      console.log('---- handleNotificationReceived ----');
      console.log('---- handleNotificationReceived ----');
      // let msg = data.payload.body;
      // let tile = data.payload.title;
      // let additionalData = data.payload.additionalData;
      // this.showAlert(tile, msg, additionalData.task);
    });
    console.log('OneSig - SetHandleRec');

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log('---- handleNotificationOpened ----');
      console.log('---- handleNotificationOpened ----');
      console.log(data);
      console.log('---- handleNotificationOpened ----');
      console.log('---- handleNotificationOpened ----');

      const additionalData = data.notification.payload.additionalData;
      if (additionalData.tipo === 'grupoMsg') {
        window.localStorage.setItem('grupoId', additionalData.grupo_id);
        this.router.navigateByUrl('/grupos/show/tabs/chat');
      } else if (additionalData.tipo === 'aprovacao') {
        this.router.navigateByUrl('/aprovacao/edit/' + additionalData.aprovacao_id);
      } else if (additionalData.tipo === 'tarefa') {
        this.router.navigateByUrl('/tarefas/form/' + additionalData.tarefa_id);
      }

      // let additionalData = data.notification.payload.additionalData;
      // this.showAlert('Not Open', 'msg', additionalData.task);

    });
    console.log('OneSig - SetHandleOpen');

    this.oneSignal.endInit();
    console.log('OneSig - SetHandleEnd');

    this.oneSignal.getPermissionSubscriptionState().then(result => {
      console.log(result.subscriptionStatus.userId);
      this.onesignalId = result.subscriptionStatus.userId;
      this.usuarioService.setOnesignal(result.subscriptionStatus.userId);
      if (this.currentUser !== undefined) {
        this.usuarioService.attOneSignalUsuario(this.currentUser.id, result.subscriptionStatus.userId).subscribe();
      }
    });
    // this.onesignalId = 'TESTE';
    console.log('++++++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++++++');

  }

  onLogout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/auth');
  }

  ngOnInit() {
    this.authSub = this.authServices.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });

    this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
      console.log('USUA PAG-------------E TS --- on init');
      console.log(usuario);
      this.currentUser = usuario;
      this.isLoading = false;
      if (usuario != null && this.onesignalId != undefined) {
        this.usuarioService.attOneSignalUsuario(usuario.id, this.onesignalId).subscribe();
      }
    });

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.logAuthSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

  login_auth() {
    this.logAuthSub = this.authServices.login().subscribe();
  }
}
