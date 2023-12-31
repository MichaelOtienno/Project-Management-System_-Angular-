import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { userlogin } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  loginSuccess:string = '';
 

  constructor(private http: HttpClient, private router: Router, private userAuth: AuthService) { }
 
  async onSubmit() {
    //credentials validation
    if (!this.email || !this.password) {
      this.loginError = 'Email and password are required';
      this.clearRegisterError(4000);
      return;
     
    } 
    const requestData = {
      email: this.email,
      password: this.password
    };
    this.loginError = '';

   await this.userAuth.login(requestData, () => {
      this.userAuth.redirect();
   
    });
    this.loginError = this.userAuth.getLoginError();
    this.loginSuccess = this.userAuth.getLoginSuccess();
    
    this.clearRegisterError(4000);

  }

  clearRegisterError(delay: number) {
    setTimeout(() => {
      this.loginError = '';
    }, delay);
  }



}
