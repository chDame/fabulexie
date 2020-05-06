import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Invitation } from '../model/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

	public filter: Invitation = new Invitation();
	public sortColumn : string = 'id';
	public sortOrder:string = 'ASC';
	
	constructor(private http: HttpClient, private authService: AuthService) {
	}
	
	public list(page:number, count:number): Observable<any> {
		let params = "count="+count+"&page="+page+"&orderBy="+this.sortColumn+"&order="+this.sortOrder+"&"+this.computeQuery();
		return this.http.get<any>(environment.settings.backend+'/invitations?'+params, {headers: this.authService.myHttpheaders});
	}
	
	public create(invitation: Invitation) {
		return this.http.post<Invitation>(environment.settings.backend+'/invitations', invitation, {headers: this.authService.myHttpBodyheaders});
	}
	
	public tutor(invitation:Invitation): Observable<Invitation> {
		let invit = new Invitation();
		invit.id = invitation.id;
		invit.tutor = !invitation.tutor;
		return this.patch(invit);
	}
	
	public admin(invitation:Invitation): Observable<Invitation> {
		let invit = new Invitation();
		invit.id = invitation.id;
		invit.admin = !invitation.admin;
		return this.patch(invit);
	}
	
	public patch(invitation:Invitation): Observable<Invitation> {
		return this.http.patch<Invitation>(environment.settings.backend+'/invitations/'+invitation.id, invitation, {headers: this.authService.myHttpBodyheaders});
	}
	
	public delete(id:number): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/invitations/'+id, {headers: this.authService.myHttpheaders});
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
