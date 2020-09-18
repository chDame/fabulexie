import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-sharing',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent implements OnInit {
	
	
  public typeahead: FormControl = new FormControl();
  //countries: string[] = countries;

  suggestions: User[] = [];
  selectedUser: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  public suggest():void {
	  if (this.typeahead.value.length>2) {
		  this.userService.search(this.typeahead.value).subscribe(data => {
			this.suggestions = data.items;
			
		  });
	  } else {
		  this.suggestions = [];
	  }
  }
  
  public select(user:User): void {
	  this.selectedUser = user;
	  this.typeahead.setValue(user.email, { onlySelf: true });
	  this.suggestions = [];
  }
  
  public createUserSharing(): void {
	  
  }
}
