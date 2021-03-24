import { UserService } from './../../../api/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {

  email: string = firebase.default.auth().currentUser.email;
  name: string = this.userService.username;
  num:number = this.userService.dressNumber;
  constructor(private router: Router,private userService: UserService) { }

  ngOnInit() {
    
  }

  save(){
    firebase.default.auth().currentUser.updateEmail(this.email);
    firebase.default.auth().currentUser.updateProfile({
      displayName: this.name
    })
    this.userService.updatePersonalInfo(this.name,this.num);
    this.router.navigate(['/profile']);
  }

}
