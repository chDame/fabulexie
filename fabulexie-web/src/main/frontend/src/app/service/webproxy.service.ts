import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebproxyService {

 
	constructor(private http: HttpClient, private authService: AuthService) {
	}
	
	public translate(url:string): Observable<any> {
		let headers = this.authService.myHttpheaders;
		headers = headers.set('url', url);
		//let params = encodeURI(encodeURIComponent(url));
		return this.http.get<any>(environment.settings.backend+'/web/', {headers: headers});
	}
}
