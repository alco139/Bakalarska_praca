import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  username: string;
  email: string;
  id: string;
  playerCollection = firebase.firestore().collection("players");

  constructor(private router: Router) {}
  
  signUp(email: string, password: string, confirmPassword: string, username: string){
    if(password === confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(email,password).then((data) => {
       
        var newUser: firebase.User = data.user;
        this.router.navigate(['/login']);
        newUser.updateProfile({
          displayName: username,
          photoURL: ""
        })
        this.username = data.user.displayName;
        this.email = data.user.email;
        this.id = data.user.uid;
        this.playerCollection.doc(data.user.uid).set({
          dressNumber: 10,
          goals: 0,
          id: data.user.uid,
          name: username,
          rating: 10
        })
      }).catch((err) => {
        alert(err);
      })
      }
      else {alert("Hesla sa nezhodujú")}
  }

  signIn(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password).then((data) => {
      this.router.navigate(['/profile']);
      this.username = data.user.displayName;
      this.email = data.user.email;
      this.id = data.user.uid;
    }).catch((err) => {
      console.log(err);
    })
  }

  getPlayer(){
    console.log(this.id);
    this.playerCollection.doc(this.id).get().then((doc) => {
      if(doc.exists){
        console.log(doc.data())
      }
    })
  }

}
