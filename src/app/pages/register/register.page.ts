import { UserService } from './../../api/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {}
  
  

  signUp(){
    if(this.password === this.confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((data) => {
        let newUser: firebase.User = data.user;
        this.router.navigate(['/login']);
        newUser.updateProfile({
          displayName: this.username,
          photoURL: ""
        }).then((res) => {
          
          console.log(res);
        })
        
      }).catch((err) => {
        alert(err);
      })
      }
      else {alert("Hesla sa nezhodujú")}
    }

}

