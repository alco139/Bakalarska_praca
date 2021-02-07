import { MatchService } from './../../api/match.service';
import { UserService } from './../../api/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.scss'],
})
export class CreateMatchPage implements OnInit {

  date: Date;
  place: string;

  constructor(private menu: MenuController,private router:Router , private userService: UserService, private matchService: MatchService) { }

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

  logOut(){
    this.userService.logOut();
  }



  sendMatch(){
    this.matchService.addMatch(this.date,this.place)
    this.router.navigate(["/profile"]);
  }
}
