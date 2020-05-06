import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public login:any;
  
  constructor(public authService: AuthService,
	private route: ActivatedRoute) {
	
		this.route.queryParams.subscribe(params => {
			let email =	params['pwdchange'];
			if (email) {
				this.authService.state='forgotPwd';
			}
			email =	params['invitation'];
			if (email) {
				this.authService.state='register';
			}
		});
	this.login = {};
  }
	  
  ngOnInit() {
	
  }
  
  public changeState(state: string): void {
	  this.authService.state=state;
  }

}
