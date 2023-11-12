import { Injectable } from '@angular/core';
import { userlogin } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginError: string = '';
  private loginSuccess:string = '';


  constructor(private http: HttpClient, private router: Router) { }
  async login(userLogin: userlogin, redirectCallback: () => void) {
    try {
      // console.log(userLogin);
      let response = await fetch('http://localhost:4600/user/login', {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userLogin)
      });

      // console.log(response);
      const data = await response.json()
      console.log(data);

      if(data.error){
        this.loginError = data.error
        console.log(this.loginError);
      }else if(data.message){
        this.loginError = '';
        this.loginSuccess = data.message;
        setTimeout(() => {
          this.loginSuccess = '';
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true'); 
          console.log(data.token);
          
          redirectCallback();
          
        }, 2000);

      } 

    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof TypeError) {
        this.loginError = 'Network error.';
      } 
    //  console.log(this.loginError);
    } 
  }

  
  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  getLoginError(): string {
    return this.loginError;
  }
  getLoginSuccess():string{
    return this.loginSuccess;
  }

  async redirect() {
    try {
      const token = localStorage.getItem('token') as string;

      const data: any = await this.http.get('http://localhost:4600/user/check_user_details', {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'token': token
        }
      }).toPromise();

      console.log(data.info);

      if (data.info.role === 'employee') {
        localStorage.setItem('user_email', data.info.email);
        this.router.navigate(['/user']);
        

      } else if (data.info.role === 'admin') {
        localStorage.setItem('user_email', data.info.email);
        this.router.navigate(['/supervisor']);
      }
    } catch (error) {
      console.error('Redirect failed:', error);

    }
  }
  


}

