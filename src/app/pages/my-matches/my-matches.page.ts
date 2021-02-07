import { UserService } from './../../api/user.service';
import { MatchService } from './../../api/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {
  public matches = [];
  constructor(private matchService: MatchService, private userService: UserService) { }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.matchService.getMatches();
    this.matches = this.matchService.matches;
    
  }

  ionViewWillLeave(){
    this.matches = [];
    this.matchService.clearMatches()
  }
  test(event){
    console.log(event);
  }
}
