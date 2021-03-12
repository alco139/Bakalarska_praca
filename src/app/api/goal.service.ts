import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  goalCollection = firebase.firestore().collection("goals");


  constructor() { }

  async addGoal(matchId:string, player){
    await this.goalCollection.add({
      matchId : matchId,
      playerId : player.id
    })

  }

  async removeGoal(matchId:string, player){
    await this.goalCollection.where("matchId", "==",matchId ).where("playerId","==",player.id).get().then((docs) => {
      docs.forEach((doc) => {
        doc.ref.delete();
        return 0;
      })
      
    })
    return -1;
  }
}
