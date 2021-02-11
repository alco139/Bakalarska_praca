import { Component, OnInit } from '@angular/core';
import { MatchService } from './../../api/match.service';
import { UserService } from './../../api/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  match: string;
  public foundMatch = [];
  constructor(private menu: MenuController, private router: Router, private userService: UserService, private matchService: MatchService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.match = this.matchService.matchToOpen;
    await this.matchService.getMatch(this.match);
    this.foundMatch = this.matchService.foundMatch;
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
