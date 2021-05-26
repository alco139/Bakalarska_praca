import { MatchService } from './../../api/match.service';
import { UserService } from './../../api/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { v4 as uuidv1 } from 'uuid';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.scss'],
})
export class CreateMatchPage implements OnInit {

  date: Date;
  place: string;
  team : any;

  constructor(private menu: MenuController,private router:Router , private userService: UserService, private matchService: MatchService,private toastController: ToastController) { }

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



  async sendMatch(){
    if(this.date == null || this.place == null || this.team == null || this.place == ""){
      const toast = await this.toastController.create({
        message: 'Neplatné dáta',
        duration: 2000,
        position: 'top',
        keyboardClose: true
      });
      toast.present(); 
    }
    else{
      var joinKey = uuidv1().substring(0,8)
      await this.matchService.addMatch(this.date,this.place, joinKey);
      if (this.team == "blue"){
        this.matchService.joinBluePlayer(joinKey);
      }
      else if (this.team == "red"){
        this.matchService.joinRedPlayer(joinKey);
      }
      this.router.navigate(["/profile"]);
    }
    }
    
}
