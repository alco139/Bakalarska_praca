import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';
import { MatchService } from 'src/app/api/match.service';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  foundMatch = [];
  bluePlayers: any[] = [];
  redPlayers:any[] = [];
  joinKey : string;
  isHidden = true;
  username:string;


  constructor(private router: Router,private matchService: MatchService, private toastController: ToastController,private userService: UserService) { }
  

  ngOnInit() {
  }
  
  async ionViewWillEnter(){
    this.userService.signAnonymous();
  }
  
  async joinMatch(){
    this.bluePlayers = [];
    this.redPlayers = [];
    this.foundMatch = [];
    await this.matchService.findMatch(this.joinKey);
    if(this.matchService.isFounded){
    
    await this.matchService.getMatch(this.joinKey); //find match
    this.foundMatch = this.matchService.foundMatch;

    await this.matchService.getBluePlayers(this.joinKey); //blue team ids
    this.bluePlayers = this.matchService.playersBlueTeam;

    await this.matchService.getRedPlayers(this.joinKey);//red team ids
    this.redPlayers = this.matchService.playersRedTeam;

    this.isHidden = false;
  }
    else{
      const toast = await this.toastController.create({
        message: 'Zápas sa nenašiel',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
    
    
  }
  async joinBlue(){
    this.matchService.joinAnonymousBluePlayer(this.joinKey,this.username);
    this.userService.addAnonymousPlayer(this.username);
    this.router.navigate['/my-matches'];

    const toast = await this.toastController.create({
      message: 'Úspešne si bol pripojený na zápas',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async joinRed(){
    this.matchService.joinAnonymousRedPlayer(this.joinKey,this.username);
    this.userService.addAnonymousPlayer(this.username);
    this.router.navigate['/my-matches'];

    const toast = await this.toastController.create({
      message: 'Úspešne si bol pripojený na zápas',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  
}
