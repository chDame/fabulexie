import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User, UserConfig, LetterRule } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

	public userConfigs: UserConfig[];

  	constructor(private http: HttpClient, private authService: AuthService) {
	}
	
	public load(userId:number): void {
		this.list(userId).subscribe((data: UserConfig[]) => {
			this.userConfigs = data;
		});
	}
	
	public list(userId:number): Observable<UserConfig[]> {
		return this.http.get<any>(environment.settings.backend+'/users/'+userId+'/configs/', {headers: this.authService.myHttpheaders});
	}
	
	public delete(userId:number, configId:number): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+userId+'/configs/'+configId, {headers: this.authService.myHttpheaders});
	}
	
	
	public save(userId:number, config: UserConfig):Observable<UserConfig> {
		if (config.id) {
			return this.put(userId, config);
		} else {
			return this.create(userId, config);
		}
	}
	
	
	private create(userId:number, config: UserConfig): Observable<UserConfig> {
		return this.http.post<UserConfig>(environment.settings.backend+'/users/'+userId+'/configs/', config, {headers: this.authService.myHttpBodyheaders});
	}
	
	private put(userId:number, config: UserConfig): Observable<UserConfig> {
		return this.http.put<UserConfig>(environment.settings.backend+'/users/'+userId+'/configs/'+config.id, config, {headers: this.authService.myHttpBodyheaders});
	}
}
