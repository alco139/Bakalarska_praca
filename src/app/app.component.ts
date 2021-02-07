import { UserService } from './api/user.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Profil',
      url: '/profile',
      icon: 'person-circle-outline'
    },
    {
      title: 'Vytvoriť zápas',
      url: '/create-match',
      icon: 'football-outline'
    },
    {
      title: 'Pripojiť sa na zápas',
      url: '/join-match',
      icon: 'link-outline'
    },
    {
      title: 'Moje zápasy',
      url: '/my-matches',
      icon: 'reader-outline'
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  onToggleColorTheme(event){
    if(event.detail.checked){
      document.getElementById('dark-mode-icon').setAttribute('name', 'moon');
      document.getElementById('main').setAttribute('color-theme','dark');
      document.getElementById('main-content').setAttribute('color-theme','dark');
    }
    else{
      document.getElementById('dark-mode-icon').setAttribute('name', 'moon-outline');
      document.getElementById('main').setAttribute('color-theme','light');
      document.getElementById('main-content').setAttribute('color-theme','light');
    }
  }

  logOut(){
    this.userService.logOut();
  }

}
