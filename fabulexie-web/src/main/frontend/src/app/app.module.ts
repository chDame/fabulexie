import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpDateInterceptor } from './interceptors/httpDateInterceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AppComponent } from './app.component';
import { UserListComponent } from './user-admin/user-list/user-list.component';
import { CreateUserComponent } from './user-admin/create-user/create-user.component';
import { UpdateUserComponent } from './user-admin/update-user/update-user.component';
import { InviteUserComponent } from './user-admin/invite-user/invite-user.component';
import { InvitationsListComponent } from './user-admin/invitations-list/invitations-list.component';
import { ConfigComponent } from './config/config.component';

import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPwdComponent } from './auth/forgot-pwd/forgot-pwd.component';

import { MyProfileComponent } from './me/my-profile/my-profile.component';
import { SettingsComponent } from './me/settings/settings.component';

import { WebProxyComponent } from './web-proxy/web-proxy.component';
import { DocReaderComponent } from './doc/doc-reader/doc-reader.component';
import { DocBrowserComponent } from './doc/doc-browser/doc-browser.component';
import { SpaceConfigComponent } from './doc/space-config/space-config.component';

import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { WebproxyService } from './service/webproxy.service';

import { EmailValidator } from './email-validator.directive';
import { PositiveValidator } from './positive-validator.directive';
import { ShortnumberPipe } from './shortnumber.pipe';
 
@NgModule({
  declarations: [
    EmailValidator,
	PositiveValidator,
	ShortnumberPipe,
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    WelcomeComponent,
    RegisterComponent,
    ForgotPwdComponent,
    UpdateUserComponent,
    MyProfileComponent,
    InviteUserComponent,
    InvitationsListComponent,
    ConfigComponent,
    WebProxyComponent,
    SettingsComponent,
    DocReaderComponent,
	DocBrowserComponent,
	SpaceConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	NgbModule,
	SocialLoginModule,
	ColorPickerModule
  ],
  providers: [UserService, AuthService, WebproxyService,
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpDateInterceptor,
		multi: true,
	},
	{
      provide: AuthServiceConfig,
      useFactory: provideSocialConfig
    },
	{
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
		deps: [HttpClient]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Your configuration provider.
export function provideSocialConfig() {
   // Get the auth provider configuration from localStorage.
    let googleCLientId = localStorage.getItem("googleClientId");
    let faceBookAppId = localStorage.getItem("faceBookAppId");
    
    return new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleCLientId)
        },
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(faceBookAppId)
        }
    ]);
}

// App initializer. This is called whenever the app is initialized, and that's when we need to get the configurations from the server.
export function initApp(http: HttpClient) {
    return () => {
        return new Promise<Boolean>(async (resolve, reject) => {
            // Load auth providers configuration.

                const result = await http.get<any>(environment.settings.backend+'/admin/config').toPromise();
                if (result) {
                    localStorage.setItem("googleClientId", result.googleClientId);
                    localStorage.setItem("faceBookAppId", result.faceBookAppId);
					//injectDOMElement('script', 'head', { src: "https://maps.googleapis.com/maps/api/js?key="+result.googleMapApiKey, type: "text/javascript"});
			   }

            resolve(true);
        });
    }
}


export function	injectDOMElement(tagName, targetSelector, options) {
	  const element = document.createElement(tagName)
	  if (options) {
		Object.keys(options).forEach(function(key) {
		  element[key] = options[key]
		})
	  }
	  document.querySelector(targetSelector).appendChild(element)
	  return element
	}