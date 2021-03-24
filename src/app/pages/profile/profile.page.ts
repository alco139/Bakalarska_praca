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

  username: string = this.userService.username;
  email: string = firebase.default.auth().currentUser.email;
  dressNumber: number;
  goals: number;
  matches: number;
  rating: number;
  constructor(private menu: MenuController, private router:Router, private userService: UserService) {
  }

  ngOnInit() {
    
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
  
  async ionViewDidEnter() {

      this.userService.getStats(this.userService.player).then(()=> {
        this.goals = this.userService.goals;
        this.matches = this.userService.matches;
        this.rating = this.userService.rating;
        this.dressNumber = this.userService.dressNumber;
        this.username = this.userService.username;
      })
     
 
    
  }

  logOut(){
    this.userService.logOut();
  }
  changeProfile(){
    this.router.navigate(['/updateProfil']);
  }
  getPlayer(){
    console.log(this.userService.player);
  }
}