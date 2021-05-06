import { GoalService } from './../../api/goal.service';
import { UserService } from './../../api/user.service';
import { Player } from './../../models/player';
import { UserMatchService } from './../../api/user-match.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../api/match.service';
import { Router } from '@angular/router';
import { IonRefresher, MenuController, ToastController } from '@ionic/angular';
import { Clipboard } from '@angular/cdk/clipboard';





@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  match: string;
  bluePlayers: any[] = [];
  redPlayers: any[] = [];
  foundMatch = [];
  players: any[] = [];

  constructor(
    private menu: MenuController,
    private router: Router,
    private userMatchService: UserMatchService,
    private matchService: MatchService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private goalService: GoalService
  ) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter() {
    this.match = this.matchService.matchToOpen;
    await this.matchService.getMatch(this.match); //find match
    this.foundMatch = this.matchService.foundMatch;
    await this.matchService.getBluePlayers(this.match); //blue team ids
    this.bluePlayers = this.matchService.playersBlueTeam;

    await this.matchService.getRedPlayers(this.match);//red team ids
    this.redPlayers = this.matchService.playersRedTeam;

  }


  ionViewWillLeave() {
    this.match = "";
    this.foundMatch = [];
    this.matchService.clearFoundMatch()
  }

  deleteMatch() {
    this.matchService.deleteMatch(this.match);
  }
  async copy() {
    this.clipboard.copy(this.match);
    const toast = await this.toastController.create({
      message: 'Kód zápasu je uložený',
      duration: 2000,
      position: 'top'
    });
    toast.present();

  }
  print() {

  }
  async swapTeam(player: Player, team: string) {
    if (team == 'blue') {
      await this.matchService.swapBluePlayer(this.match, player).then(() => {
        this.getPlayers(this.match)
      });
    }
    else if (team == 'red') {
      await this.matchService.swapRedPlayer(this.match, player).then(() => {
        this.getPlayers(this.match)
      });;
    }
  }
  async getPlayers(joinKey: string) {
    await this.matchService.getBluePlayers(this.match);
    this.bluePlayers = this.matchService.playersBlueTeam;
    await this.matchService.getRedPlayers(this.match);
    this.redPlayers = this.matchService.playersRedTeam;
  }

  async leaveMatch(player: Player, team: string) {
    if (team == 'blue') {
      await this.matchService.leaveBluePlayer(this.match, player).then(() => {
        this.getPlayers(this.match);
      });
    }
    else if (team == 'red') {
      await this.matchService.leaveRedPlayer(this.match, player).then(() => {
        this.getPlayers(this.match);
      });;
    }
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  async shuffle() {
    await this.matchService.getAllPlayers(this.match);
    this.players = this.matchService.players;
    if (this.players.length % 2 == 0) {
      this.redPlayers = [];
      this.bluePlayers = []


      for (let i = 0; i < this.players.length; i++) {
        var randomIndexToSwap = this.getRandomInt(this.players.length);
        var temp = this.players[randomIndexToSwap];
        this.players[randomIndexToSwap] = this.players[i];
        this.players[i] = temp;
      }
      for (let i = 0; i < this.players.length / 2; i++) {
        this.bluePlayers.push(this.players[i]);
      }
      for (let i = this.players.length / 2; i < this.players.length; i++) {
        this.redPlayers.push(this.players[i]);
      }
      await this.matchService.setBluePlayers(this.bluePlayers, this.match)
      await this.matchService.setRedPlayers(this.redPlayers, this.match)

      const toast = await this.toastController.create({
        message: 'Tímy boli premiešané',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    
    }
    else{
      const toast = await this.toastController.create({
        message: 'Nepárny počet hráčov v zápase',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }
  async addGoal(player: Player, team: string){
    await this.userMatchService.addGoal(player,this.match, team);
    this.foundMatch = this.matchService.foundMatch;
    this.goalService.addGoal(this.match, player);

  
  }
  
  async deleteGoal(player: Player, team:string){
    await this.goalService.removeGoal(this.match,player);
    if(this.goalService.isFounded){
      await this.userMatchService.removeGoal(player,this.match,team);
    }
    else{
      const toast = await this.toastController.create({
        message: 'Tento hráč nestrelil',
        duration: 2000,
        position: 'top'
      });
      toast.present();
  
    }
    this.foundMatch = this.matchService.foundMatch;
    
  }

}
