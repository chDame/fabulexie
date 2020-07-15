import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
 
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	public user: User;
	users: User[];
	count:number;
	perPage:number=10;
	pages:number;
	currPage:number = 1;
	
	constructor(public authService: AuthService,
		public userService: UserService,
		private router: Router) {
	}
 
	ngOnInit() {
		this.reload();
	}
	
	public reload(): void {
		this.userService.list(this.currPage, this.perPage).subscribe(data => {
			this.users = data.items;
			this.count = data.total;
			this.pages = Math.ceil(this.count / this.perPage);
		});
	}
	
	public sort(column:string):void {
		if (this.userService.sortColumn == column) {
			this.userService.sortOrder = (this.userService.sortOrder=='ASC')?'DESC':'ASC';
		} else {
			this.userService.sortColumn = column;
			this.userService.sortOrder = 'ASC';
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
	
	public valid(index:number) {
		let userId = this.users[index].id;
		if (userId!=this.authService.user.id) {
			this.userService.valid(this.users[index]).subscribe(data => {
				this.users[index] = data.user;
			});
		}
	}
	
	public admin(index:number) {
		let userId = this.users[index].id;
		if (userId!=this.authService.user.id) {
			this.userService.admin(this.users[index]).subscribe(data => {
				this.users[index] = data.user;
			});
		}
	}
	
	public tutor(index:number) {
		let userId = this.users[index].id;
		if (userId!=this.authService.user.id) {
			this.userService.tutor(this.users[index]).subscribe(data => {
				this.users[index] = data.user;
			});
		}
	}
	
	public unlock(index:number) {
		let userId = this.users[index].id;
		if (userId!=this.authService.user.id) {
			this.userService.unlock(this.users[index]).subscribe(data => {
				this.users[index] = data.user;
			});
		}
	}
	
	public deletePopup(index:number) {
		this.user = this.users[index];
	}
	
	public delete() {
		this.userService.delete(this.user.id).subscribe(data => {
			this.reload();
		});
	}
	
	public update(index:number) {
		this.userService.userToUpdate = this.users[index];
		this.router.navigate(['/updateUser']);
	}
	
	public setPage(page:number): void {
		this.currPage = page;
		this.reload();
	}
	
	public filterValid(value:boolean) {
		this.userService.filter.valid = value;
		this.reload();
	}
	
	public filterAdmin(value:boolean) {
		this.userService.filter.admin = value;
		this.reload();
	}
		
	public filterTutor(value:boolean) {
		this.userService.filter.tutor = value;
		this.reload();
	}
	
	public filterLocked(value:boolean) {
		this.userService.filter.locked = value;
		this.reload();
	}
}
