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
	
	public uploader:FileUploader;
	loading:boolean;
	fileItem: FileItem;

	constructor(public authService: AuthService,
		private userService: UserService,
		private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.authService.info='';
		this.authService.error='';
		this.buildUploader(this.authService.user.id);
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
	
	buildUploader(id:number) {
		this.uploader = new FileUploader({url: environment.settings.backend+'/users/'+id+'/photo', allowedMimeType: ['image/png', 'image/jpeg'], disableMultipart: true});
			
		let authHeader = [{name: 'Authorization' , value: this.authService.user.token}];
		
		const uploadOptions = <FileUploaderOptions>{headers : authHeader, isHTML5: true, removeAfterUpload: true};
		this.uploader.setOptions(uploadOptions);

		this.uploader.onAfterAddingFile = (item: FileItem) => {
			this.fileItem = item;
		}
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			this.authService.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(response);
			this.fileItem = null;
			this.loading = false;
        };
		this.uploader.onErrorItem = (item:any, response:any, status:any, headers:any) => {
			this.globalError = JSON.parse(response)["message"]+'. Retry?';
			this.fileItem = null;
			this.loading = false;
        };
	}
	
	upload() {
		this.loading = true
		this.fileItem.method = "POST";
		this.fileItem.withCredentials=false;
		this.fileItem.upload();
	}
	
	deleteImg() {
		this.userService.deleteImg(this.authService.user.id).subscribe(data => {
			this.globalInfo = 'Profile photo deleted';
			this.authService.user.photo = null;
		});
	}

}
