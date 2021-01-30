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
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  updateEmail(){
    firebase.default.auth().currentUser.updateEmail(this.email);
    this.router.navigate(['/profile']);
  }

}
