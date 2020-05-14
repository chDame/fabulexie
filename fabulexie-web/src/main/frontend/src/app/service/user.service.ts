import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { User, UserConfig } from '../model/user';
 
@Injectable()
export class UserService {
	
	public filter: User = new User();
	public sortColumn : string = 'id';
	public sortOrder:string = 'ASC';
 
	public userToUpdate: User;
 
	constructor(private http: HttpClient, private authService: AuthService) {
	}
 
	public list(page:number, count:number): Observable<any> {
		let params = "count="+count+"&page="+page+"&orderBy="+this.sortColumn+"&order="+this.sortOrder+"&"+this.computeQuery();
		return this.http.get<any>(environment.settings.backend+'/users?'+params, {headers: this.authService.myHttpheaders});
	}
 
	public get(id:number): Observable<User> {
		return this.http.get<User>(environment.settings.backend+'/users/'+id, {headers: this.authService.myHttpheaders});
	}
	
	public create(user: User) {
		return this.http.post<User>(environment.settings.backend+'/users', user, {headers: this.authService.myHttpBodyheaders});
	}
	
	public valid(user:User): Observable<User> {
		let u = new User();
		u.id = user.id;
		u.valid = !user.valid;
		return this.patch(u);
	}
	
	public tutor(user:User): Observable<User> {
		let u = new User();
		u.id = user.id;
		u.tutor = !user.tutor;
		return this.patch(u);
	}
	
	public admin(user:User): Observable<User> {
		let u = new User();
		u.id = user.id;
		u.admin = !user.admin;
		return this.patch(u);
	}
	
	public unlock(user:User): Observable<User> {
		let u = new User();
		u.id = user.id;
		u.locked = false;
		return this.patch(u);
	}
	
	public assignConfig(user: User, config: UserConfig): Observable<User> {
		let u = new User();
		u.id = user.id;
		u.activeConfig = config;
		return this.patch(u);
	}
	
	public updateUser(): Observable<User> {
		return this.patch(this.userToUpdate);
	}
	
	public patch(user:User): Observable<User> {
		console.log('pouet');
		return this.http.patch<User>(environment.settings.backend+'/users/'+user.id, user, {headers: this.authService.myHttpBodyheaders});
	}
	
	public delete(userId:number): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+userId, {headers: this.authService.myHttpheaders});
	}
	
	public deleteImg(userId:number): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+userId+'/photo', {headers: this.authService.myHttpheaders});
	}
				
	computeQuery() {
		let init = false;
		let query='';
			
		for(var prop in this.filter){
			let val = this.filter[prop];
				if (val && val!='') {
				if (init) {
					query+=' AND ';
				}
				query+=prop+':"'+this.filter[prop]+'"';
				init = true;
			}
		}
				
		if (init) {
			query = 'q='+query;
		}
		return query;
	}
}