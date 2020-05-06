import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    public login:User;
	public code:string = null;
  
	constructor(public authService: AuthService,
		private route: ActivatedRoute) {
		this.login = new User();
		this.route.queryParams.subscribe(params => {
			let email =	params['invitation'];
			let code =	params['code'];
			if (email && code) {
				this.login.email=email;
				this.code=code;
			}
		});
	}

	onRegister() {
		this.authService.register(this.login, this.code);
	}
 
}
