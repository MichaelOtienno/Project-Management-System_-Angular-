import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  ImagePath!: string;
  imagePaths: string[] = [
    '/assets/tt.jpg',
    '/assets/vinge.webp'
  ];

  ngOnInit() {
    this.selectRandomImage();
  }
  
  selectRandomImage() {
   
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    this.ImagePath = this.imagePaths[randomIndex];
  }






}
