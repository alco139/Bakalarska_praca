import { UserService } from './../../api/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {}
  
  

  signUp(){
    if(this.password === this.confirmPassword){
      this.userService.signup(this.email,this.password).subscribe(resData => {
        if(resData){
          this.router.navigate(['/profile']);
        }
        else{
          alert('Failed to register');
        }
      })
    }
    else{
      alert('Heslá sa nezhodujú');
    }
  }
}
