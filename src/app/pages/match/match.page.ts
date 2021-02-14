import { UserMatchService } from './../../api/user-match.service';
import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../api/match.service';
import { UserService } from './../../api/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  match: string;
  playersBlueId: any[] = [];
  playersRedId: any[] = [];
  playersBlueNames: string[] = [];
  playersRedNames: string[] = [];
  public foundMatch = [];
  constructor(private menu: MenuController, private router: Router, private userMatchService: UserMatchService, private matchService: MatchService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.match = this.matchService.matchToOpen;
    await this.matchService.getMatch(this.match); //find match
    this.foundMatch = this.matchService.foundMatch;
    await this.matchService.getBluePlayers(this.match); //blue team ids
    this.playersBlueId = this.matchService.playersCurrentTeam;

    await this.userMatchService.getAllPlayersNames(this.playersBlueId); //blue team names
    this.playersBlueNames = this.userMatchService.playersNames;

    await this.matchService.getRedPlayers(this.match);//red team ids
    this.playersRedId = this.matchService.playersCurrentTeam;

    await this.userMatchService.getAllPlayersNames(this.playersRedId); //red team names
    this.playersRedNames = this.userMatchService.playersNames;
    
    

  }

  ionViewWillLeave(){
    this.match = "";
    this.foundMatch = [];
    this.matchService.clearFoundMatch()
  }

  delete(){
    this.matchService.deleteMatch(this.match);
  }
  print(){
    console.log(this.playersRedNames);
    console.log(this.playersBlueNames);
  }
}
