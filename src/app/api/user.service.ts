import { MatchService } from './match.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Player } from '../models/player';
import { ToastController } from '@ionic/angular';


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
  matches: number;
  dressNumber: number;

  playerCollection = firebase.firestore().collection("players");
  constructor(private router: Router,private toastController: ToastController) { }

  logOut() {
    firebase.auth().signOut().then(() => {
      this.router.navigate(['/login'])
    }
    );
  }

  async signUp(email: string, password: string, confirmPassword: string, username: string) {
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
          dressNumber: 0,
          goals: this.goals,
          id: data.user.uid,
          name: username,
          rating: this.rating,
          matches: 0
        })
      }).catch((err) => {
        alert(err);
      })
    }
    else { 
      const toast = await this.toastController.create({
        message: 'Hesla sa nezhodujú',
        duration: 2000,
        position: 'top',
        keyboardClose: true
      });
      toast.present(); 
    }
  }

  async signIn(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
      this.router.navigate(['/profile']);
      this.username = data.user.displayName;
      this.email = data.user.email;
      this.id = data.user.uid;
      

    }).catch((err) => {
      console.log(err);
    })
    await this.playerCollection.doc(this.id).get().then((doc) => {
     
      this.goals = doc.data().goals;
      this.rating = doc.data().rating; 
      this.matches = doc.data().matches;
      this.dressNumber = doc.data().dressNumber;
      this.player = new Player(this.id,this.username,this.goals,this.rating,this.matches,this.dressNumber);
    })
  }

  getPlayerId() {
    this.playerCollection.doc(this.id).get().then((doc) => {
      if (doc.exists) {
        return doc.data().id;
      }
    })
  }
  getId() {
    return this.id;
  }

  async getStats(player: Player){
    

    await this.playerCollection.doc(player.id).get().then((doc) => {
      this.goals = doc.data().goals,
      this.rating = doc.data().rating,
      this.matches = doc.data().matches,
      this.dressNumber = doc.data().dressNumber,
      this.player = new Player(this.id,this.username,this.goals,this.rating,this.matches,this.dressNumber);
    })
  }
  async addGoal(player: Player){
    this.goals++;
  }
  addMatch(player: Player){
    this.matches++;
  }
  async updatePersonalInfo(username:string, dressNumber:number){
    var playerRef = this.playerCollection.doc(firebase.auth().currentUser.uid);
    await playerRef.update({
      dressNumber: dressNumber,
      name: username
  }).then(()=>{
      this.username = username;
      this.dressNumber= dressNumber;
  })
  }
  async updateStats(player: Player){
    var playerRef = this.playerCollection.doc(player.id);
    await playerRef.update({
      goals: this.goals,
      rating: this.rating,
      matches: this.matches
  })
  }
  async removeGoal(player: Player){
    this.goals--;
    var playerRef = this.playerCollection.doc(player.id);
    await playerRef.update({
      goals: this.goals
  })
  }
  async joinMatch(){
    var playerRef = this.playerCollection.doc(firebase.auth().currentUser.uid);
    var tmp;
    await playerRef.get().then((doc) => {
      tmp = doc.data().matches;
      tmp++;

    })
    await playerRef.update({
      matches : tmp
    })
  }
  signAnonymous(){
    firebase.auth().signInAnonymously();
  }
  async addAnonymousPlayer(username:string){
    await this.playerCollection.doc(firebase.auth().currentUser.uid).set({
      dressNumber: 0,
      goals: 0,
      id: firebase.auth().currentUser.uid,
      name: username,
      rating: 0,
      matches: 0
    })
    await this.playerCollection.doc(firebase.auth().currentUser.uid).get().then((doc) => {
      this.goals = doc.data().goals;
      this.rating = doc.data().rating; 
      this.matches = doc.data().matches;
      this.dressNumber = doc.data().dressNumber;
      this.player = new Player(this.id,this.username,this.goals,this.rating,this.matches,this.dressNumber);
    })
  }
  }

  
