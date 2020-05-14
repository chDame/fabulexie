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
			for(let i=0;i<this.userConfigs.length;i++) {
				this.prepareForEdition(this.userConfigs[i]);
			}
		});
	}
	
	public list(userId:number): Observable<UserConfig[]> {
		return this.http.get<any>(environment.settings.backend+'/users/'+userId+'/configs/', {headers: this.authService.myHttpheaders});
	}
	
	public delete(userId:number, configId:number): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+userId+'/configs/'+configId, {headers: this.authService.myHttpheaders});
	}
	
	
	public save(userId:number, config: UserConfig):Observable<UserConfig> {
		this.prepareForBackend(config);
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
	
	public preview(config: UserConfig): Observable<any> {
		this.prepareForBackend(config);
		return this.http.post<any>(environment.settings.backend+'/preview/', config, {headers: this.authService.myHttpBodyheaders});
	}
	
	private prepareForBackend(config: UserConfig): UserConfig {
		for(let i=0;i<config.letterRules.length;i++) {
			let rule = config.letterRules[i];
			rule.letters=[];
			for(let u=0;u<rule.lettersString.length;u++) {
				let letter = rule.lettersString.charAt(u);
				if (letter.trim()!='') {
					rule.letters.push(letter);
				}
			}
		}
		return config;
	}
	
	
	private prepareForEdition(config: UserConfig): UserConfig {
		for(let i=0;i<config.letterRules.length;i++) {
			let rule = config.letterRules[i];
			rule.lettersString='';
			for(let u=0;u<rule.letters.length;u++) {
				rule.lettersString+=rule.letters[u];
			}
		}
		return config;
	}
}
