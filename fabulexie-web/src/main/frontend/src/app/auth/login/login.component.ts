import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthService as SocialAuthService, SocialUser  } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 

import { AuthService } from '../../service/auth.service';
import { SocialService } from '../../service/social.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login:User;
  
  
  constructor(public socialAuthService: SocialAuthService,
	public authService: AuthService,
	public socialService: SocialService) {
	this.login = new User();
	this.login.remember = true;
  }

  public onLogin(): void {
	this.authService.login(this.login);
  }
 
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
  
  ngOnInit() {

  }
}
