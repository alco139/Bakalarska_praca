import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import firebase from 'firebase';
let firebaseConfig = {
  apiKey: "AIzaSyCTX9obFkfJEWiaHKXBi8udgBIYWXJ3DMc",
  authDomain: "bakalarskapraca-c7c83.firebaseapp.com",
  databaseURL: "https://bakalarskapraca-c7c83.firebaseio.com",
  projectId: "bakalarskapraca-c7c83",
  storageBucket: "bakalarskapraca-c7c83.appspot.com",
  messagingSenderId: "408115180376",
  appId: "1:408115180376:web:31c7d1b68d95ab3122eb2d",
  measurementId: "G-B6WMBLET4Q"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
