import { MatchService } from './../../../api/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-match',
  templateUrl: './update-match.page.html',
  styleUrls: ['./update-match.page.scss'],
})
export class UpdateMatchPage implements OnInit {

  date: string;
  place: string;
  foundMatch: any[] = [];
  constructor(private matchService: MatchService, private router: Router,) { }

  ngOnInit() {
  }

  
    ionViewWillEnter() {
      this.matchService.getMatch(this.matchService.matchToOpen).then(()=>{
        this.foundMatch = this.matchService.foundMatch;
     });
  }
  async updateMatch(date,place){
     await this.matchService.updateMatch(date,place);
     this.router.navigate(['/match']);
  }
}
