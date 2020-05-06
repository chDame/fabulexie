import { Component, OnInit } from '@angular/core';
import { SocialService } from '../service/social.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

	config:any;
	error:String;
	info: String;
	constructor(public socialService: SocialService) { }

	ngOnInit() {
		this.socialService.getConfig().subscribe(data => {
			this.config = data;
		});
	}
	
	updateConfig() {
		this.socialService.patchConfig(this.config).subscribe(data => {
			this.config = data;
			this.info = 'Configuration updated. You have to refresh your browser to take it into account.';
		});
	}
		

}
