import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserConfigService } from '../../service/user-config.service';
import { User, UserConfig } from '../../model/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public userConfig: UserConfig;
  public currentIdx: number;
  
  globalError: string = '';
  globalInfo: string = '';
	
  constructor(public authService: AuthService,
		public userConfigService: UserConfigService) { }

  ngOnInit(): void {
	  this.userConfigService.load(this.authService.user.id);
  }
  
  public newUserConfig() {
	this.userConfig = new UserConfig();
	this.userConfig.name = 'My new profile';
  }	  
  public setCurrentUserConfig(index:number) {
	this.userConfig = this.userConfigService.userConfigs[index];
	this.currentIdx=index;
  }


  public saveConfig() {
	this.userConfigService.save(this.authService.user.id, this.userConfig).subscribe((data: UserConfig) => {
		this.globalInfo = 'Reader profile saved';
		this.userConfigService.load(this.authService.user.id);
	});
  }

  public deleteConf() {
	this.userConfigService.delete(this.authService.user.id, this.userConfig.id).subscribe(data => {
		this.globalInfo = 'Reader profile deleted';
		this.userConfigService.userConfigs.splice(this.currentIdx, 1);
	});
  }
}
