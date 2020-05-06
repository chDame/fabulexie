import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
 
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
 
  user: User;
  error: string = null;
  
  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: UserService) {
    this.user = new User();
  }
 
  onSubmit() {
    this.userService.create(this.user).subscribe(result => {this.gotoUserList(); this.error=null;},
	error=>{this.error=error.error.message;});
  }
 
  gotoUserList() {
    this.router.navigate(['/users']);
  }
}