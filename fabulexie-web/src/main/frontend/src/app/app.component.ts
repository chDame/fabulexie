import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { SocialService } from './service/social.service';
import { AuthService as SocialAuthService, SocialUser  } from "angularx-social-login";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
    public googleMapApiKey = localStorage.getItem("googleMapApiKey");
  
  constructor(public authService: AuthService,
		public socialAuthService: SocialAuthService,
	public socialService: SocialService,
	private route: ActivatedRoute) {
		this.route.queryParams.subscribe(params => {
			let code =	params['code'];
			let email =	params['valid'];
			if (email && code) {
				this.authService.valid(email, code);
			}
		});
  }
  
    ngOnInit() {
		this.socialAuthService.authState.subscribe((user: SocialUser) => {
		if (user!=null && (this.authService.user === null || user.email !== this.authService.user.email)) {
			if (user!=null && user.provider=='GOOGLE') {
				this.socialService.socialAuth(user.idToken, user.provider);
			} else if (user!=null && user.provider=='FACEBOOK') {
				this.socialService.socialAuth(user.authToken, user.provider);
			}
		}
		if (user==null && this.authService.user!=null && this.authService.user.loginSource!='standard') {
			this.authService.logout();
		}
    });
  }

}
