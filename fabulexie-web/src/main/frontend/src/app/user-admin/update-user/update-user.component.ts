import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  public error:string;

  constructor(public userService: UserService,
    private route: ActivatedRoute, 
      private router: Router) { }

  ngOnInit() {
  }
  
  onSubmit() {
	this.userService.updateUser().subscribe(result => this.gotoUserList(), error => this.error=error.error.message);
  }
 
  gotoUserList() {
    this.router.navigate(['/users']);
  }

}
