import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent} from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { LoadingComponent } from './loading/loading.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';




const routes: Routes = [
  { path: 'loading', component: LoadingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'signin', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserComponent },
  { path: 'supervisor', component: SupervisorComponent }, 
  { path: '', redirectTo: '/loading', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    LandingComponent,
    UserComponent,
    LoadingComponent,
    SupervisorComponent,
    PagenotfoundComponent,
    AboutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
