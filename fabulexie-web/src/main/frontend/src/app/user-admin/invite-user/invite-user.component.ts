import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { InvitationService } from '../../service/invitation.service';
import { Invitation } from '../../model/invitation';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {

  invitation: Invitation;
  error: string = null;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
	public authService: AuthService,
    private invitationService: InvitationService) {
    this.invitation = new Invitation();
  }
 
  onSubmit() {
    this.invitationService.create(this.invitation).subscribe(result => {this.gotoInvitationsList(); this.error=null;},
	error=>{this.error=error.error.message;});
  }
 
  gotoInvitationsList() {
    this.router.navigate(['/invitations']);
  }

}
