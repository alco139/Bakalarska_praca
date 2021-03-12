import { Router } from '@angular/router';
import { UserService } from './../../../api/user.service';
import { Platform, ToastController } from '@ionic/angular';
import { MatchService } from './../../../api/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-match',
  templateUrl: './join-match.page.html',
  styleUrls: ['./join-match.page.scss'],
})
export class JoinMatchPage implements OnInit {
  
  foundMatch = [];
  bluePlayers: any[] = [];
  redPlayers:any[] = [];
  joinKey : string;
  isHidden = true;


  constructor(private router: Router,private matchService: MatchService, private toastController: ToastController,private userService: UserService) { }
  

  ngOnInit() {
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
  joinBlue(){
    this.matchService.joinBluePlayer(this.joinKey);
    this.userService.joinMatch();
    this.router.navigate['/my-matches'];
  }
  joinRed(){
    this.matchService.joinRedPlayer(this.joinKey);
    this.userService.joinMatch();
    this.router.navigate['/my-matches'];
  }
}
