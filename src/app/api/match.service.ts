import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import firebase from 'firebase';

import { IonApp } from '@ionic/angular';
import { exit } from 'process';


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  scoreTeamRed: number;
  scoreTeamBlue: number;
  date: Date;
  place: string;
  matchCreator: string;
  playersRed:any[] = [];
  playersBlue:any[] = [];
  joinKey: string;
  matches: any[] = [];
  players: any[] = [];
  matchCollection = firebase.firestore().collection("matches");

  matchToOpen: string;
  foundMatch: any[] = [];
  isFounded: boolean;
  

  constructor(private router: Router, private userService: UserService) {
    
  }

  addMatch(date: Date, place: string, joinKey: string) {
    this.players = [];
    this.players.push(this.userService.getId());
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
  }

  getMatch(joinKey: string) {
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

  async joinBluePlayer(joinKey){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersBlue = doc.data().playersBlue;
        this.playersBlue.push(this.userService.getId());
        this.players = doc.data().players ;
        this.players.push(this.userService.getId());
        this.players = this.players.filter(this.onlyUnique);
        this.playersBlue = this.playersBlue.filter(this.onlyUnique);
        doc.ref.update({
          playersBlue: this.playersBlue,
          players: this.players
        })
      })
    })
  }

  async joinRedPlayer(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersRed = doc.data().playersRed;
        this.playersRed.push(this.userService.getId());
        this.players = doc.data().players;
        this.players.push(this.userService.getId());
        this.players = this.players.filter(this.onlyUnique);
        this.playersRed =this.playersRed.filter(this.onlyUnique);
        doc.ref.update({
          playersRed: this.playersRed,
          players: this.players
        })
      })
    })
  }

  async getRedPlayers(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersRed = doc.data().playersRed;
      })
    })
  }

  async getBluePlayers(joinKey : string){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersBlue = doc.data().playersBlue;
      })
    })
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}