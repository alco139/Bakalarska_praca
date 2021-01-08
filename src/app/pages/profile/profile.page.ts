import { Component, OnInit } from '@angular/core';
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
  
  constructor(private menu: MenuController,private router:Router) {
     
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
     /*  document.getElementById('ion-tg-0-lbl').innerText = "Svetlá téma"; */
      document.getElementById('main').setAttribute('color-theme','dark');
    }
    else{
      document.getElementById('dark-mode-icon').setAttribute('name', 'moon-outline');
/*       document.getElementById('ion-tg-0-lbl').innerText = "Tmavá téma";
 */      document.getElementById('main').setAttribute('color-theme','light');
    }
  }

  logOut(){
    console.log(this.username);
    firebase.default.auth().signOut().then(() => {
      this.router.navigate(['/login'])
    } 
    );
  }

}