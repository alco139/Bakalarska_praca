import { UserService } from './../../api/user.service';
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
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    this.userService.signIn(this.email,this.password);
  }
  filip(){
    this.userService.signIn("filip@filip.sk","123456");
  }
  alan(){
    this.userService.signIn("alan@alan.sk","123456");
  }

}
