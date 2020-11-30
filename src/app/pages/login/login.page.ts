import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string;
  password: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((data) => {
      this.router.navigate(['/profile']);
      console.log(data.user);
    }).catch((err) => {
      console.log(err);
    })
  }


}
