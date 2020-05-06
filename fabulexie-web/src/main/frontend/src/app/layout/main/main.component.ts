import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthService as SocialAuthService, SocialUser  } from "angularx-social-login";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'Fabulexie';

	public sideBarClass:string = '';
	
	constructor( public router: Router, 
		public authService: AuthService,
		public socialAuthService: SocialAuthService) { }

	ngOnInit() {
		if (this.router.url === '/') {
			this.router.navigate(['/properties']);
		}
	}

	public toggle():void {
		if (this.sideBarClass==='') {
			this.sideBarClass = 'toggled';
		} else {
			this.sideBarClass = '';
		}
	}

	
	public logout():void {
		if (this.authService.user.loginSource!='standard') {
			this.socialAuthService.signOut();
		}
		this.authService.logout();
	}

}
