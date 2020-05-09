import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { InvitationService } from '../../service/invitation.service';
import { Invitation } from '../../model/invitation';

@Component({
  selector: 'app-invitations-list',
  templateUrl: './invitations-list.component.html',
  styleUrls: ['./invitations-list.component.scss']
})
export class InvitationsListComponent implements OnInit {
	public invitation: Invitation;
	invitations: Invitation[];
	count:number;
	perPage:number=10;
	pages:number;
	currPage:number = 1;
	
	constructor(public authService: AuthService,
		public invitationService: InvitationService,
		private router: Router) {
	}
 
	ngOnInit() {
		this.reload();
	}
	
	public reload(): void {
		this.invitationService.list(this.currPage, this.perPage).subscribe(data => {
			this.invitations = data.items;
			this.count = data.total;
			this.pages = Math.ceil(this.count / this.perPage);
		});
	}
	
	public sort(column:string):void {
		if (this.invitationService.sortColumn == column) {
			this.invitationService.sortOrder = (this.invitationService.sortOrder=='ASC')?'DESC':'ASC';
		} else {
			this.invitationService.sortColumn = column;
			this.invitationService.sortOrder = 'ASC';
		}
		this.reload();
	}
	
	public changePerPage(): void {
		this.pages = Math.ceil(this.count / this.perPage);
		if (this.currPage>this.pages) {
			this.currPage = this.pages;
		}
		this.reload();
	}
	
	public admin(index:number) {
		let invitationId = this.invitations[index].id;
		this.invitationService.admin(this.invitations[index]).subscribe(data => {
			this.invitations[index] = data;
		});
	}
	
	public tutor(index:number) {
		let invitationId = this.invitations[index].id;
		this.invitationService.tutor(this.invitations[index]).subscribe(data => {
			this.invitations[index] = data;
		});
	}
	
	public deletePopup(index:number) {
		this.invitation = this.invitations[index];
	}
	
	public delete() {
		this.invitationService.delete(this.invitation.id).subscribe(data => {
			this.reload();
		});
	}
	
	public setPage(page:number): void {
		this.currPage = page;
		this.reload();
	}
	
	public filterAdmin(value:boolean) {
		this.invitationService.filter.admin = value;
		this.reload();
	}
		
	public filterTutor(value:boolean) {
		this.invitationService.filter.tutor = value;
		this.reload();
	}
		
	public filterConfirmed(value:boolean) {
		this.invitationService.filter.confirmed = value;
		this.reload();
	}
}