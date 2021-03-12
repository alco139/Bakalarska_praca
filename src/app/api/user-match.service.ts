import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { MatchService } from './match.service';
import { Player } from '../models/player';
import { Goal } from '../models/goal';


@Injectable({
  providedIn: 'root'
})
export class UserMatchService {

  playersNames: string[] = [];
  goal: Goal;


  constructor(private matchService: MatchService, private userService: UserService) { }


  async getAllPlayersNames(playersIds: string[]) {
    this.playersNames = [];
    await playersIds.forEach(id => {
      this.userService.playerCollection.doc(id).get().then((doc) => {
        this.playersNames.push(doc.data().name);
      })
    })
  }
  addGoal(player: Player, joinKey: string, team: string) {
    this.userService.getStats(player).then(() => {
      this.userService.addGoal(player).then(() => {
        this.userService.updateStats(player).then(() => {
          this.matchService.addGoalToMatch(joinKey, team);
        })
      })
    });


  }

  async removeGoal(player: Player, joinKey: string, team: string) {
    this.matchService.removeGoal(joinKey, team);
    this.userService.removeGoal(player);
  }
}
