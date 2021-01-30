import { UserService } from './../../api/user.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string = firebase.default.auth().currentUser.displayName;
  email: string = firebase.default.auth().currentUser.email;
  
  constructor(private menu: MenuController, private router:Router, private userService: UserService) {
  }

  ngOnInit() {
    
  }
  

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
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
    console.log(this.username);
    firebase.default.auth().signOut().then(() => {
      this.router.navigate(['/login'])
    } 
    );
  }
  
  getPlayer(){
    this.userService.getPlayer();
  }
}