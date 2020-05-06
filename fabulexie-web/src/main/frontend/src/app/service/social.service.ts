import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

	public token = null;
	constructor(private http: HttpClient,
	public authService: AuthService) { 
		
	}
	
	socialAuth(token: String, provider: String):void {
		this.token = token;
		this.http.get<User>(environment.settings.backend+'/social/'+provider.toLowerCase()+'/'+token).subscribe((data: User) => {
				this.authService.setLogged(data);
			},
			error => {
				this.authService.error = error.error.message;
				this.authService.info='';
			});
	}	
	
	public getConfig(): Observable<any> {
		return this.http.get<any>(environment.settings.backend+'/admin/config', {headers: this.authService.myHttpheaders});
	}
	
	public patchConfig(config:any): Observable<any> {
		return this.http.patch<any>(environment.settings.backend+'/admin/config', config, {headers: this.authService.myHttpBodyheaders});
	}
}
