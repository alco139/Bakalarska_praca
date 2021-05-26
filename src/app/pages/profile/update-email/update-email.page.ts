import { UserService } from './../../../api/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {

  email: string = firebase.default.auth().currentUser.email;
  name: string = this.userService.username;
  num:number = this.userService.dressNumber;
  constructor(private router: Router,private userService: UserService,private toastController: ToastController) { }

  ngOnInit() {
    
  }

  async save(){
    if(this.email == null || this.email == "" || this.name == null || this.name == "" || this.num <=0 ){
      const toast = await this.toastController.create({
        message: 'Dáta obsahujú neplatné údaje',
        duration: 2000,
        position: 'top',
        keyboardClose: true
      });
      toast.present(); 
    }
    else{
      firebase.default.auth().currentUser.updateEmail(this.email);
      firebase.default.auth().currentUser.updateProfile({
        displayName: this.name
      })
      this.userService.updatePersonalInfo(this.name,this.num);
      this.router.navigate(['/profile']);
    }
    
  }

}
