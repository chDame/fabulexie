import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Document } from '../model/document';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient, private authService: AuthService) {
	}
	
	
	public list(page:number, count:number): Observable<any> {
		let params = "count="+count+"&page="+page+"&orderBy=id&order=DESC";
		return this.http.get<any>(environment.settings.backend+'/documents?'+params, {headers: this.authService.myHttpheaders});
	}
	
}
