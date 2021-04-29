import { UserService } from './../../api/user.service';
import { MatchService } from './../../api/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {
  public matches = [];
  public matchesPast = [];
  constructor(private router:Router ,private matchService: MatchService, private userService: UserService) { }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.matchService.getMatches();
    this.matchService.getMatchesPast();
    this.matches = this.matchService.matches;
    this.matchesPast = this.matchService.matchesPast;
    console.log(this.matchesPast);
  }

  ionViewWillLeave(){
    this.matches = [];
    this.matchesPast = [];
    this.matchService.clearMatches()
  }
  goToMatch(uuid){
    this.matchService.matchToOpen = uuid;
    this.router.navigate(['/match'])
  }
}
