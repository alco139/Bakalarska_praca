import { UserMatchService } from './../../api/user-match.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../api/match.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  match: string;
  bluePlayers: any[] = [];
  redPlayers:any[] = [];
  public foundMatch = [];
  constructor(
      private menu: MenuController,
      private router: Router, 
      private userMatchService: UserMatchService, 
      private matchService: MatchService
     ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.match = this.matchService.matchToOpen;
    await this.matchService.getMatch(this.match); //find match
    this.foundMatch = this.matchService.foundMatch;
    await this.matchService.getBluePlayers(this.match); //blue team ids
    this.bluePlayers = this.matchService.playersCurrentTeam;

    await this.matchService.getRedPlayers(this.match);//red team ids
    this.redPlayers = this.matchService.playersCurrentTeam;

  
    
    

  }

  ionViewWillLeave(){
    this.match = "";
    this.foundMatch = [];
    this.matchService.clearFoundMatch()
  }

  delete(){
    this.matchService.deleteMatch(this.match);
  }
  async print(){
    for(var i = 0; i < this.bluePlayers.length; i++){
      await console.log(this.bluePlayers[i]);
      await console.log(this.redPlayers[i]);
      await console.log(this.bluePlayers[i].name);
    }
    
  }
}
