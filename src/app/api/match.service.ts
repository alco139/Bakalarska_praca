import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import firebase from 'firebase';
import { v4 as uuidv1 } from 'uuid';
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

  addMatch(date: Date, place: string) {
    this.players.push(this.userService.getId());
    this.matchCollection.add({
      scoreTeamRed: 0,
      scoreTeamBlue: 0,
      date: date,
      place: place,
      matchCreatorId: this.userService.getId(),
      playersRed: [],
      playersBlue: [],
      joinKey: uuidv1().substring(0,8),
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
        doc.ref.update({
          playersBlue: this.playersBlue,
          players: this.players
        })
      })
    })
  }

  async joinRedPlayer(joinKey){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc) => {
        this.playersRed = doc.data().playersRed;
        this.playersRed.push(this.userService.getId());
        this.players = doc.data().players;
        this.players.push(this.userService.getId());
        doc.ref.update({
          playersRed: this.playersRed,
          players: this.players
        })
      })
    })
  }
}