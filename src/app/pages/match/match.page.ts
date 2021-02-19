import { Player } from './../../models/player';
import { UserMatchService } from './../../api/user-match.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../api/match.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Clipboard } from '@angular/cdk/clipboard';





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
      private matchService: MatchService,
      private clipboard: Clipboard,
      private toastController: ToastController
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
  async copy(){
    this.clipboard.copy(this.match);
    const toast = await this.toastController.create({
      message: 'Kód zápasu je uložený',
      duration: 2000,
      position: 'top'
    });
    toast.present();

  }
  print(){

  }
  swapTeam(player : Player, team : string){
    if(team == 'blue'){
      this.matchService.swapBluePlayer(this.match,player);
    }
    else if(team == 'red'){
      this.matchService.swapRedPlayer(this.match,player);
    }

  }
}
