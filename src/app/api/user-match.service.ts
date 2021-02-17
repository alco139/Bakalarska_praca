import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { MatchService } from './match.service';

@Injectable({
  providedIn: 'root'
})
export class UserMatchService {
  
  playersNames: string[] = [];


  constructor(private matchService: MatchService, private userService: UserService) { }
  
  
    async getAllPlayersNames(playersIds: string[]) {
      this.playersNames = [];
      await playersIds.forEach( id =>{
      this.userService.playerCollection.doc(id).get().then((doc) => {
      this.playersNames.push(doc.data().name);
      })
    })
    // await this.matchService.playersCurrentTeam.forEach(player => {
    //   this.userService.playerCollection.doc(player).get().then((doc) => {
    //     console.log(doc.data().name);
    //     this.playersNames.push(doc.data().name);
    //   })
    // });
   
  }
}
