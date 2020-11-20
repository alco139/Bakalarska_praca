import { UserService } from './../../api/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {}
  email: string;
  password: string;
  confirm_password: string;
  

  signUp(){
    if(this.password === this.confirm_password){
      this.userService.signup(this.email,this.password).subscribe(resData =>{
        console.log(resData);
      })
    }
    else{
      alert('Heslá sa nezhodujú');
    }
  }
}
