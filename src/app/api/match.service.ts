import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import firebase from 'firebase';
import { v4 as uuidv1 } from 'uuid';
import { IonApp } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  scoreTeamRed: number;
  scoreTeamBlue: number;
  date: Date;
  place: string;
  matchCreator: string;
  playersRed: string;
  playersBlue: string;
  joinKey: string;
  matches: any[] = [];

  matchCollection = firebase.firestore().collection("matches");

  matchToOpen: string;
  foundMatch: any[] = [];

  constructor(private router: Router, private userService: UserService) { }

  addMatch(date: Date, place: string) {

    this.matchCollection.add({
      scoreTeamRed: 0,
      scoreTeamBlue: 0,
      date: date,
      place: place,
      matchCreatorId: this.userService.getId(),
      playersRed: [],
      playersBlue: [],
      joinKey: uuidv1(),
      isActive: false,
      goals: []

    })
  }
  getMatches() {
    this.matchCollection.where("matchCreatorId", "==", this.userService.id).get().then((docs) => {
      docs.forEach((doc) => {
        this.matches.push(doc.data());
      })
    })
  }

  getMatch(matchToOpen) {
    if (matchToOpen) {
      this.matchCollection.where("joinKey", "==", matchToOpen).get().then((docs) => {
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

  async deleteMatch(joinKey){
    await this.matchCollection.where("joinKey", "==", joinKey).get().then((docs) => {
      docs.forEach((doc)=>{
        doc.ref.delete();
      })
    })
    this.router.navigate(['/my-matches'])
  }
}