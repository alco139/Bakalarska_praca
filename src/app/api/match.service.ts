import { Player } from './../models/player';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  scoreTeamRed: number;
  scoreTeamBlue: number;
  date: Date;
  place: string;
  matchCreator: string;
  playersBlueTeam:any[] = [];
  playersRedTeam:any[] = [];
  joinKey: string;
  matches: any[] = [];
  players: any[] = [];
  matchCollection = firebase.firestore().collection("matches");

  matchToOpen: string;
  foundMatch: any[] = [];
  isFounded: boolean;
  

  constructor(public router: Router, private userService: UserService) {
    
  }

  addMatch(date: Date, place: string, joinKey: string) {
    this.players = [];
    
    var player: Player = new Player(firebase.auth().currentUser.uid,firebase.auth().currentUser.displayName,0,0);
    this.players.push(player.toJson());
    console.log(this.players)
    this.matchCollection.add({
      scoreTeamRed: 0,
      scoreTeamBlue: 0,
      date: date,
      place: place,
      matchCreatorId: this.userService.getId(),
      playersRed: [],
      playersBlue: [],
      joinKey: joinKey,
      isActive: false,
      goals: [],
      players: this.players

    })
  }
  getMatches() {
    this.matchCollection.where("matchCreatorId", "==", this.userService.id).get().then((docs) => {
      docs.forEach((doc) => {
        this.matches.push(doc.data());
      })
    })
    this.matchCollection.where("players", "array-contains-any", [this.userService.player.toJson()]).get().then((docs) => {
      docs.forEach((doc) => {
        this.matches.push(doc.data());
      })
    })
  }

  getMatch(joinKey: string) {
    this.foundMatch = [];
    if (joinKey) {
      this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
        docs.forEach((doc) => {
          this.foundMatch.push(doc.data());
        })
      })
    }
    else {
      alert("Zápas sa nenašiel");
    }
  }

  clearMatches() {
    this.matches = [];
  }

  clearFoundMatch() {
    this.foundMatch = [];
  }

  async deleteMatch(joinKey) {
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        doc.ref.delete();
      })
    })
    this.router.navigate(['/my-matches'])
  }

  async findMatch(matchToOpen) {
    this.isFounded = false;
    if (matchToOpen) {
      await this.matchCollection.get().then((docs) => {

        docs.forEach((doc) => {
          if (doc.data().joinKey == matchToOpen) {
            this.isFounded = true;
          }
        })
      })
    }
    else {
      alert("Zápas sa nenašiel");
    }
  }

  async joinBluePlayer(joinKey: string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        var player : Player = new Player(firebase.auth().currentUser.uid,firebase.auth().currentUser.displayName,this.userService.goals,this.userService.rating)
        if(doc.data().matchCreatorId == firebase.auth().currentUser.uid){
          doc.ref.update({
            playersBlue: firebase.firestore.FieldValue.arrayUnion(player.toJson()),
            playersRed: firebase.firestore.FieldValue.arrayRemove(player.toJson()),
          })
        }
        else{
          doc.ref.update({
            playersRed: firebase.firestore.FieldValue.arrayRemove(player.toJson()), 
            playersBlue: firebase.firestore.FieldValue.arrayUnion(player.toJson()),
            players: firebase.firestore.FieldValue.arrayUnion(player.toJson())
          })
        }
      
        
      })
    })
  }

  async joinRedPlayer(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        var player : Player = new Player(firebase.auth().currentUser.uid,firebase.auth().currentUser.displayName,this.userService.goals,this.userService.rating)
        if(doc.data().matchCreatorId == firebase.auth().currentUser.uid){
          doc.ref.update({
            playersRed: firebase.firestore.FieldValue.arrayUnion(player.toJson()),
            playersBlue: firebase.firestore.FieldValue.arrayRemove(player.toJson()), 
          })
        }
        else{
          doc.ref.update({
            playersBlue: firebase.firestore.FieldValue.arrayRemove(player.toJson()), 
            playersRed: firebase.firestore.FieldValue.arrayUnion(player.toJson()),
            players: firebase.firestore.FieldValue.arrayUnion(player.toJson()),
          })
        }
      })
    })
  }

  async swapBluePlayer(joinKey : string, player: Player){
    var swapPlayer : Player = new Player(player.id, player.name, player.goals, player.rating);
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.data().matchCreatorId == firebase.auth().currentUser.uid){
          doc.ref.update({
            playersRed: firebase.firestore.FieldValue.arrayUnion(swapPlayer.toJson()),
            playersBlue: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()), 
          })
        }
        else{
          doc.ref.update({
            playersBlue: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()), 
            playersRed: firebase.firestore.FieldValue.arrayUnion(swapPlayer.toJson()),
          })
        }
      })
    })
    await this.getPlayers(joinKey);
    
  }
  async swapRedPlayer(joinKey : string, player: Player){
    var swapPlayer : Player = new Player(player.id, player.name, player.goals, player.rating);
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        
        if(doc.data().matchCreatorId == firebase.auth().currentUser.uid){
          doc.ref.update({
            playersBlue: firebase.firestore.FieldValue.arrayUnion(swapPlayer.toJson()),
            playersRed: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()), 
          })
          
        }
        else{
          doc.ref.update({
            playersRed: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()), 
            playersBlue: firebase.firestore.FieldValue.arrayUnion(swapPlayer.toJson()),
          })
          
        }
      })
    })
    
    await this.getPlayers(joinKey);
   
  }


  async getRedPlayers(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersRedTeam = doc.data().playersRed;
      })
    })
  }

  async getBluePlayers(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersBlueTeam = doc.data().playersBlue;
      })
    })
  }

  async getPlayers(joinKey: string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersBlueTeam = doc.data().playersBlue,
        this.playersRedTeam = doc.data().playersRed
      })
    })
  }

  async leaveBluePlayer(joinKey:string, player: Player){
    var swapPlayer : Player = new Player(player.id, player.name, player.goals, player.rating);
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
          doc.ref.update({           
            playersBlue: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()),
            players: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson())
          })
        })    
    })
  }
  async leaveRedPlayer(joinKey:string, player: Player){
    var swapPlayer : Player = new Player(player.id, player.name, player.goals, player.rating);
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
          doc.ref.update({           
            playersRed: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson()),
            players: firebase.firestore.FieldValue.arrayRemove(swapPlayer.toJson())
          })
        })    
    })
  }
  async getAllPlayers(joinKey: string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.players = doc.data().players      
      })
    })
  }

  async setRedPlayers(redPlayers: any[], joinKey: string){
   
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
          doc.ref.update({           
            playersRed: redPlayers,
          })
        })    
    })
  }

  async setBluePlayers(bluePlayers: any[], joinKey: string){
 
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
          doc.ref.update({           
            playersBlue: bluePlayers,
          })
        })    
    })
  }
  }
  
