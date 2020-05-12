import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserConfigService } from '../../service/user-config.service';
import { User, Rule, UserConfig, LetterRule } from '../../model/user';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public userConfig: UserConfig;
  public currentIdx: number;
  public example: SafeHtml;
  
  globalError: string = '';
  globalInfo: string = '';
	
  constructor(public authService: AuthService,
		public userConfigService: UserConfigService,
		private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
	  this.userConfigService.load(this.authService.user.id);
  }
  
  public newUserConfig() {
	this.userConfig = new UserConfig();
	this.userConfig.letterRules = [];
	this.userConfig.name = 'My new profile';
  }	  
  
  public setCurrentUserConfig(index:number) {
	this.userConfig = Object.assign({}, this.userConfigService.userConfigs[index]);
	this.currentIdx=index;
  }

  public saveConfig() {
	this.userConfigService.save(this.authService.user.id, this.userConfig).subscribe((data: UserConfig) => {
		this.globalInfo = 'Reader profile saved';
		this.userConfigService.load(this.authService.user.id);
	});
  }

  public addLetterRule() {
	  this.userConfig.letterRules.push(new LetterRule());
  }
  
  public addPunctuationRule() {
	  let rule = new LetterRule();
	  rule.lettersString = '?,.;/:!%*€£$+=})]¿[(\'{"#&—';
	  rule.color='#CC0000';
	  rule.bold=true;
	  this.userConfig.letterRules.push(rule);
  }
  
  public addVoyelRule() {
	  let rule = new LetterRule();
	  rule.lettersString = 'aeiou';
	  rule.color='#aa22bb';
	  rule.italic=true;
	  this.userConfig.letterRules.push(rule);
  }
  
  public addUppercaseRule() {
	  let rule = new LetterRule();
	  rule.lettersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	  rule.color='#00CC33';
	  rule.bold=true;
	  this.userConfig.letterRules.push(rule);
  }
  
  public toggleRule(rule:Rule, attribute:string) {
	  rule[attribute] = !rule[attribute];
  }
  public deleteRule(index:number) {
	  this.userConfig.letterRules.splice(index,1);
  }
  public preview() {
	  this.userConfigService.preview(this.userConfig).subscribe(data => {
		  this.example = this.sanitizer.bypassSecurityTrustHtml(data.result);
	  });
  }

  public deleteConf() {
	this.userConfigService.delete(this.authService.user.id, this.userConfig.id).subscribe(data => {
		this.globalInfo = 'Reader profile deleted';
		this.userConfigService.userConfigs.splice(this.currentIdx, 1);
	});
  }
}
