
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
    this.userService.signUp(this.email,this.password,this.confirmPassword,this.username);
    }
    
}

