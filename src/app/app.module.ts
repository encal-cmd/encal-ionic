import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import * as firebase from 'firebase';
import {firebaseConfig} from './firebaseconfig';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
firebase.initializeApp(firebaseConfig);

import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, IonicSelectableModule],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileChooser,
    File,
    FilePath,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
