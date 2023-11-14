import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4600/user';

  constructor(private http: HttpClient) { }

  //signup
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }


  //fetch projects
  fetchProjects(userEmail: string): Observable<any> {
    const apiUrl = 'http://localhost:4600/project';

    return this.http.get(apiUrl, { params: { user_email: userEmail } });
  }


  //employee completes assignment
  completeProject(): Observable<any> {
    const user_email = localStorage.getItem('user_email');
    const passStatus = 'completed';
    const passEmail = user_email;
    const apiUrl = 'http://localhost:4600/project/projectStatus';

    const postData = {
      AssignedUserEmail: passEmail,
      NewStatus: passStatus
    };

    return this.http.post(apiUrl, postData);
  }


  //employee starts project
  startProject(): Observable<any> {
    const user_email = localStorage.getItem('user_email');
    const passStatus = 'ongoing';
    const passEmail = user_email;
    const apiUrl = 'http://localhost:4600/project/projectStatus';

    const postData = {
      AssignedUserEmail: passEmail,
      NewStatus: passStatus
    };

    return this.http.post(apiUrl, postData);
  }





}
