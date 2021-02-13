import { Platform } from '@ionic/angular';
import { MatchService } from './../../../api/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-match',
  templateUrl: './join-match.page.html',
  styleUrls: ['./join-match.page.scss'],
})
export class JoinMatchPage implements OnInit {

  match_id : string;
  isHidden = true;
  constructor(private matchService: MatchService) { }

  ngOnInit() {
  }

  async joinMatch(){
    await this.matchService.findMatch(this.match_id);
    if(this.matchService.isFounded){
      //console.log("funguje");
      this.isHidden = false;
    }
    else{
      //console.log("nefunguje");
      alert("Zápas sa nenašiel")
    }
    
    
  }
  joinBlue(){
    this.matchService.joinBluePlayer(this.match_id);
  }
  joinRed(){
    this.matchService.joinRedPlayer(this.match_id);
  }
}
