import { MatchService } from './match.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Player } from '../models/player';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  username: string;
  email: string;
  id: string;
  goals: number;
  rating: number;
  player: Player;

  playerCollection = firebase.firestore().collection("players");
  constructor(private router: Router) { }

  logOut() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/login'])
    }
    );
  }

  signUp(email: string, password: string, confirmPassword: string, username: string) {
    if (password === confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {

        var newUser: firebase.User = data.user;
        this.router.navigate(['/login']);
        newUser.updateProfile({
          displayName: username,
          photoURL: ""
        })
        this.username = data.user.displayName;
        this.email = data.user.email;
        this.id = data.user.uid;
        this.goals = 0;
        this.rating = 10;
        this.playerCollection.doc(data.user.uid).set({
          dressNumber: 10,
          goals: this.goals,
          id: data.user.uid,
          name: username,
          rating: this.rating
        })
      }).catch((err) => {
        alert(err);
      })
    }
    else { alert("Hesla sa nezhodujú") }
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
      this.router.navigate(['/profile']);
      this.username = data.user.displayName;
      this.email = data.user.email;
      this.id = data.user.uid;
      this.goals = 0;
      this.rating = 10;
      this.player = new Player(data.user.uid,data.user.displayName,this.goals,this.rating)

    }).catch((err) => {
      console.log(err);
    })
  }

  getPlayerId() {
    this.playerCollection.doc(this.id).get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data().id)
        return doc.data().id;
      }
    })
  }
  getId() {
    return this.id;
  }
}
