import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  projects: any[] = [];
  filteredProjects: any[] = [];

  employeeEmail: string = '';
  statusError: string = '';
  currentStatus: string = '';
  showButton: boolean = true;
  isCompleted: boolean = true;
  isCardVisble:boolean = true;


  time: any;
  userEmail!: string;
  user_email: any;


  constructor(private http: HttpClient) { }

  fetchProjects() {
    const apiUrl = 'http://localhost:4600/project';
    const user_email = localStorage.getItem('user_email');

    if (user_email) {
      this.http.get(apiUrl, { params: { user_email } }).subscribe((data: any) => {
        this.projects = data;
        this.filteredProjects = this.projects.filter(project => {
          return project.AssignedUserEmail === user_email && project.projectStatus !== 'completed';
        });
  

        this.filteredProjects.forEach(project => {

          let time = project.projectStatus
          this.time = time;
          console.log(time);

          let userEmail = project.AssignedUserEmail
          if(this.time == "completed"){
            this.showButton = false
          }

        })

      },
        (error: HttpErrorResponse) => {
          console.error(error);

        }
      );
    }
  }


  formatDate(endDate: string) {
    const formattedEndDate = new Date(endDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    return formattedEndDate.toLocaleDateString('en-US');
  }

  start() {
    const user_email = localStorage.getItem('user_email');
    this.isCompleted = false
    this.time = "ongoing"
    let passStatus = this.time
    console.log(passStatus);

    let passEmail = user_email
    console.log(passEmail);

    const apiUrl = 'http://localhost:4600/project/projectStatus';
    const postData = {
      AssignedUserEmail: passEmail,
      NewStatus: passStatus
    }
    this.http.post(apiUrl, postData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("passed");


      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }

    );
    this.fetchProjects()

  }


  complete() {
    const user_email = localStorage.getItem('user_email');
    this.isCompleted = true
    this.time = "completed"
    let passStatus = this.time
    let passEmail = user_email
    
    const apiUrl = 'http://localhost:4600/project/projectStatus';

    const postData = {
      AssignedUserEmail: passEmail,
      NewStatus: passStatus
    };
    this.http.post(apiUrl, postData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("passed");

      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }

    );
    this.showButton = false;
    this.isCardVisble = false;
    this.fetchProjects()
    passStatus

  }


  ngOnInit() {
    

    const user_email = localStorage.getItem('user_email');
    if (user_email) {
      this.employeeEmail = user_email;
      this.fetchProjects();
    }

  }


  }






