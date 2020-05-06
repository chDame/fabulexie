import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	
	public state:string = 'login';
  
	public error: String;
	public info: String;

	cookiesAccepted: boolean = false;
	public user: User = null;
	initialised: boolean = false;
  
	LOCAL_TOKEN_KEY = "authenticationToken";
	public myHttpheaders: HttpHeaders;
	public myHttpBodyheaders: HttpHeaders;
  
	constructor(private http: HttpClient,
		private sanitizer: DomSanitizer) { 
		this.http.get<any>(environment.settings.backend+'/authentication/initialised')
				.subscribe((data: any) => {
						this.initialised = data.result;
					},
					error => {
						this.initialised = false;
					});
		var cookiesOk = window.localStorage.getItem("cookiesOk");

		if (cookiesOk) {
			this.cookiesAccepted = true;
		}
		this.buildHeaders();
		this.loginWithToken();
	}
	
	buildHeaders() {
		if (!this.myHttpheaders) {
			this.myHttpheaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
				.set('Cache-Control', 'no-cache')
				.set('version', '1.0.a');
			this.myHttpBodyheaders = new HttpHeaders().set('Content-Type', 'application/json')
				.set('Cache-Control', 'no-cache')
				.set('version', '1.0.a');
		}
		//return this.myHttpheaders;
	}
  
	acceptCookies(): void {
		this.cookiesAccepted = true;
		window.localStorage.setItem("cookiesOk", "true");
	}
  
	public isAuthenticated():boolean {
		return this.user!=null && this.user.token!=null;
	}
  
	private updateHeaders():void {
		this.myHttpheaders = this.myHttpheaders.set('Authorization', this.user.token);
		this.myHttpBodyheaders = this.myHttpBodyheaders.set('Authorization', this.user.token);
	}
	
	public registerInvitation(user: User, code: string):void {
	}
	
	public register(user: User, code: string):void {
		let registerHeaders = this.myHttpBodyheaders;
		if (code) {
			registerHeaders = this.myHttpBodyheaders.set('code', code);
		}
		this.http.post<User>(environment.settings.backend+'/authentication/register', user, {headers: registerHeaders})
			.subscribe((data: User) => {
						this.user = data;
						this.initialised = true;
						if (!data.token) {
							this.info = 'Your account is created. We have sent you a verification link to validate your email address.';
						} else {
							this.updateHeaders();
						}
						this.error = '';
						this.state='login';
					},
					error => {
						this.error = error.error.message;
						this.info='';
					});
	}
	
	public valid(email: string, code: string): void {
		let body = 'email=' + email + '&code=' + code;

		this.http.get<User>(environment.settings.backend+'/authentication/validUser?' + body, {headers: this.myHttpheaders})
			.subscribe((data: User) => {
						this.user = data;
						this.updateHeaders();
						this.error='';
						this.info='';
					},
					error => {
						this.error = error.error.message;
						this.info='';
					});
	}
  
	public login(user: User):void {
		
		let body = 'email=' + user.email + '&password=' + user.password;
		let resultat;
		this.http.post<User>(environment.settings.backend+'/authentication/login', body, {headers: this.myHttpheaders})
			.subscribe((data: User) => {
						this.user = data;
						if (data.photo!=null) {
							this.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(data.photo);
						}
						if (user.remember) {
							window.localStorage.setItem(this.LOCAL_TOKEN_KEY, this.user.email+':'+this.user.token);
						}
						this.updateHeaders();
						this.error='';
						this.info='';
					},
					error => {
						this.error = error.error.message;
						this.info='';
					});
	}
	
	public setLogged(user2:User): void {
		this.user = user2;
		if (user2.photo!=null) {
			this.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(user2.photo);
		}
		this.updateHeaders();
		this.error='';
		this.info='';
	}
	
	loginWithToken() {
		
		var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);

		if (token) {
			let idxSplit = token.indexOf(':');
			let mail = token.substring(0,idxSplit);
			let authToken = token.substring(idxSplit+1);
			
			this.myHttpheaders = this.myHttpheaders.set('Authorization', authToken);
			
			let body = 'email=' + mail;
			this.http.post<User>(environment.settings.backend+"/authentication/loginWithToken", body, {headers: this.myHttpheaders}).subscribe(
					(data: User) => {
						if (data.token!=null) {
							this.user = data;
							if (data.photo!=null) {
								this.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(data.photo);
							}
							window.localStorage.setItem(this.LOCAL_TOKEN_KEY, this.user.email+':'+this.user.token);
							this.updateHeaders();
							this.error='';
							this.info='';
						}
					}, 
					error => {
						this.logout();
					});			
		}
	}

	
	
	newPassword(email):void {
		let body = 'email=' + email;
		
		this.http.post<any>(environment.settings.backend+"/authentication/requirePwdChange", body, {headers: this.myHttpheaders}).subscribe(
			(data: any) => {
				if (data.status=='success') {
					this.info = 'We have sent a verification code to '+email+' that is necessary to modify your password.';
					this.error = '';
				} else {
					this.error = 'Your account doesn\'t exist';
					this.info = '';
				}
			},
			error => {
				this.error = 'Something went wrong. Please try again later.';
				this.info='';
			}
		);
	}
	
	registerNewPwd(email, code, pwd):void {
		let body = 'email=' + email + '&securityCode=' + code + '&newPassword='+pwd+'&uuid=web';
		
		this.http.post<User>(environment.settings.backend+"/authentication/changePwd", body, {headers: this.myHttpheaders}).subscribe(
			(data: User) => {
					this.user = data;
					if (data.photo!=null) {
						this.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(data.photo);
					}
					this.updateHeaders();
					this.info = '';
					this.error = '';
				},
				error => {
					this.error = error.error.message;
					this.info='';
				});
	}
	
	logout() {
		this.user = null;
		this.buildHeaders();
		window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
	}
	
	public isInitialised(): boolean {
		return this.initialised;
	}
  
	public isCookiesAccepted(): boolean {
		return this.cookiesAccepted;
	}
  
}
