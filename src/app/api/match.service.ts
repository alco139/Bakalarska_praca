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

  idMatch = "auasdfmlasdlk";
  scoreTeamRed: number;
  scoreTeamBlue: number;
  date: Date;
  place: string;
  matchCreator: string;
  playersRed: string ;
  playersBlue:string;
  joinKey: string;
  
  matchCollection = firebase.firestore().collection("matches");

  constructor(private router: Router, private userService: UserService) { }
  
  addMatch( date: Date, place: string){
  
    console.log(this.userService.getPlayerId())
    this.matchCollection.add({
      idMatch: "1",
      scoreTeamRed: 0,
      scoreTeamBlue: 0,
      date: date,
      place: place,
      matchCreatorId: this.userService.getId(),
      playersRed: ["1abc","2efg","3hij"],
      playersBlue: ["1,2,3"],
      joinKey : "1"


    })
  }
}
