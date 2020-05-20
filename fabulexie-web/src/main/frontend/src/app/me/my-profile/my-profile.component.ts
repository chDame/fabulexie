import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

	public changePwd: boolean;
	public password: string;
	public passwordConf: string;
  
	globalError: string = '';
	globalInfo: string = '';
	
	loading:boolean;

	constructor(public authService: AuthService,
		private userService: UserService,
		private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.authService.info='';
		this.authService.error='';
	}
  
	public onSubmit() {
		let user: User = new User();
		user.id=this.authService.user.id;
		user.firstname = this.authService.user.firstname;
		user.lastname = this.authService.user.lastname;
		if (this.changePwd==true) {
			user.password = this.password;
		}
		this.userService.patch(user).subscribe(data => {
			this.globalInfo = 'Update done';
		});
	}
	

}
