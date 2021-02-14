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
  playersBlueId: any[];
  playersRedId: any[] = [];
  playersBlueNames: string[];
  playersRedNames: string[];
  public foundMatch = [];
  constructor(private menu: MenuController, private router: Router, private userService: UserService, private matchService: MatchService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.match = this.matchService.matchToOpen;
    await this.matchService.getMatch(this.match);
    this.foundMatch = this.matchService.foundMatch;
    await this.matchService.getRedPlayers(this.match);
    this.playersRedId = this.matchService.playersRed;
    await this.matchService.getBluePlayers(this.match);
    this.playersBlueId = this.matchService.playersBlue;
    console.log(this.playersBlueId);
  }

  ionViewWillLeave(){
    this.match = "";
    this.foundMatch = [];
    this.matchService.clearFoundMatch()
  }

  delete(){
    this.matchService.deleteMatch(this.match);
  }
}
