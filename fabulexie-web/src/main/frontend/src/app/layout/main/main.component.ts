import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';
import { AuthService as SocialAuthService, SocialUser  } from "angularx-social-login";
import { SpaceAccess } from '../../model/document';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'Fabulexie';

	public sideBarClass:string = '';
	
	spaces: Array<SpaceAccess> = [];
	
	constructor( public router: Router, 
		public authService: AuthService,
		public docService: DocService,
		public socialAuthService: SocialAuthService) { }

	ngOnInit() {
		this.docService.loadSpaces();
		if (this.router.url === '/') {
			this.router.navigate(['/browse']);
		} 
	}
	
	public openSpace(space:SpaceAccess):void {
		this.docService.setCurrentSpace(space);
		this.router.navigate(['/browse']);
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
