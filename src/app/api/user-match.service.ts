import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { MatchService } from './match.service';
import { Player } from '../models/player';
import { Goal } from '../models/goal';
import { join } from 'path';

@Injectable({
  providedIn: 'root'
})
export class UserMatchService {
  
  playersNames: string[] = [];
  goal: Goal;
  

  constructor(private matchService: MatchService, private userService: UserService) { }
  
  
    async getAllPlayersNames(playersIds: string[]) {
      this.playersNames = [];
      await playersIds.forEach( id =>{
      this.userService.playerCollection.doc(id).get().then((doc) => {
      this.playersNames.push(doc.data().name);
      })
    })
  }
  async addGoal(player: Player, joinKey : string,team:string){
    this.goal  = new Goal(player.id, joinKey);
    this.userService.getStats();
    this.userService.updateStats(player);
    this.matchService.addGoalToMatch(joinKey, this.goal,team);
  }
}
