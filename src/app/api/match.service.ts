import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  playersRed: string ;
  playersBlue:string;
  joinKey: string;
  matches: any[] = [];

  matchCollection = firebase.firestore().collection("matches");

  constructor(private router: Router, private userService: UserService) { }
  
  addMatch( date: Date, place: string){
  
    console.log(this.userService.getPlayerId())
    this.matchCollection.add({
      scoreTeamRed: 0,
      scoreTeamBlue: 0,
      date: date,
      place: place,
      matchCreatorId: this.userService.getId(),
      playersRed: [],
      playersBlue: [],
      joinKey : "1" ,
      isActive : false,
      goals : []

    })
  }
    getMatches(){
    this.matchCollection.where("matchCreatorId", "==", this.userService.id).get().then((docs) => {
      docs.forEach((doc) => {
        this.matches.push(doc.data());
      })
    })
  }
    clearMatches(){
      this.matches = [];
    }
}