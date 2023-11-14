import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,private http :HttpClient){}
  //projects
  projects: any[] = [];
  filteredProjects: any[] = [];
  noneCompleted:boolean = false

  //forms/project card
  employeeEmail: string = '';
  statusError: string = '';
  currentStatus: string = '';
  showButton: boolean = true;
  isCompleted: boolean = true;
  isCardVisble: boolean = true;


  userEmail!: string;
  user_email: any;
  freeEmployee: string = ''

  //time aspects
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  time: any;
  countdown: any = ''
  finishTime: string = ''
  private countdownInterval: any;
  countdownStopped: boolean = false;


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
          let userEmail = project.AssignedUserEmail

          if (this.time == "completed") {
            this.showButton = false
          }
          let time = project.projectStatus
          this.time = time;
        
          this.finishTime = project.endDate
          this.calculateCountdown()
        })

      },
        (error: HttpErrorResponse) => {
          console.error(error);

        }
      );
    }
  }

  // fetchProjects(userEmail: string) {
  //   this.userService.fetchProjects(userEmail).subscribe(
  //     (data: any) => {
  //       this.projects = data;
  //       this.filteredProjects = this.projects.filter(project => {
  //         return project.AssignedUserEmail === userEmail && project.projectStatus !== 'completed';
  //       });

  //       this.filteredProjects.forEach(project => {
  //         if (this.time == 'completed') {
  //           this.showButton = false;
  //         }

  //         let time = project.projectStatus;
  //         this.time = time;
  //         console.log(time);

  //         this.finishTime = project.endDate;
  //         console.log(this.finishTime);
  //         this.calculateCountdown();
  //       });
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error(error);
  //     }
  //   );
  // }


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
    this.userService.startProject().subscribe(
      (data: any) => {
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
    this.fetchProjects();
  }


  complete() {
    this.userService.completeProject().subscribe(
      (data: any) => {
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );

    this.showButton = false;
    this.isCardVisble = false;
    this.fetchProjects();
    this.freeEmployee = '';
    this.countdownStopped = true;
    this.noneCompleted = true
  }
  

  ngOnInit(): void{
    const user_email = localStorage.getItem('user_email');
    if (user_email) {
      this.employeeEmail = user_email;
      this.fetchProjects();
    }
    this.countdownInterval = setInterval(() => {
      this.calculateCountdown();
    }, 1000);
  }


  ngOnDestroy() {

    clearInterval(this.countdownInterval);
  }


  calculateCountdown(): void {
    //stop countdown
    if (this.countdownStopped) {
      this.countdown = '0d 0h 0m 0s';
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;
    }
    const currentDate = new Date();
    const endDates = new Date(this.finishTime)
    if (isNaN(endDates.getTime())) {
      // console.error("Invalid finishTime:", this.finishTime);
      return;
    }

    const timeDifference = endDates.getTime() - currentDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  }
}






