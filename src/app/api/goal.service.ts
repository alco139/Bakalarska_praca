import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { exit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  
  isFounded = false;


  goalCollection = firebase.firestore().collection("goals");
  constructor() { }

  async addGoal(matchId:string, player){
    await this.goalCollection.add({
      matchId : matchId,
      playerId : player.id
    })

  }

  async removeGoal(matchId:string, player){
    this.isFounded = false;
    await this.goalCollection.where("matchId", "==",matchId ).where("playerId","==",player.id).get().then((docs) => {
      var tmp = 0;
        docs.forEach((doc)=>{
          if(tmp == 0){
            doc.ref.delete();
            this.isFounded = true;
            tmp++;
          }
          
        }) 
    })
  }
}
