import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {

    public login:any;
	public state:string='';
  
  constructor(public authService: AuthService,
	private route: ActivatedRoute) {
		this.login = {};
		this.route.queryParams.subscribe(params => {
			let code =	params['code'];
			let email =	params['pwdchange'];
			if (email && code) {
				this.state='code';
				this.login.email=email;
				this.login.code=code;
			}
		});
  }

  ngOnInit() {
  }
  
  public sendMeCode(): void {
	  this.authService.newPassword(this.login.email);
	  this.state='code';
  }
  
  public changePwd(): void {
	  this.authService.registerNewPwd(this.login.email, this.login.code, this.login.password);
	  this.state='';
  }

}
