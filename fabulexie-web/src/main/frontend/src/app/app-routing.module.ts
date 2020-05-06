import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-admin/user-list/user-list.component';
import { CreateUserComponent } from './user-admin/create-user/create-user.component';
import { UpdateUserComponent } from './user-admin/update-user/update-user.component';
import { InviteUserComponent } from './user-admin/invite-user/invite-user.component';
import { InvitationsListComponent } from './user-admin/invitations-list/invitations-list.component';
import { MyProfileComponent } from './me/my-profile/my-profile.component';
import { ConfigComponent } from './config/config.component';
import { WebProxyComponent } from './web-proxy/web-proxy.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: CreateUserComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'inviteUser', component: InviteUserComponent },
  { path: 'invitations', component: InvitationsListComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'webproxy', component: WebProxyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }